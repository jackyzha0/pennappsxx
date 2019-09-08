from PIL import Image
from PIL import ImageTk
import Tkinter as tki
from Tkinter import Toplevel, Scale
import threading
import datetime
import cv2
import os
import time
import platform
import requests
from google.cloud import storage

class TelloUI:
    """Wrapper class to enable the GUI."""

    def __init__(self,tello,outputpath):
        """
        Initial all the element of the GUI,support by Tkinter

        :param tello: class interacts with the Tello drone.

        Raises:
            RuntimeError: If the Tello rejects the attempt to enter command mode.
        """

        self.tello = tello # videostream device
        self.outputPath = outputpath # the path that save pictures created by clicking the takeSnapshot button
        self.frame = None  # frame read from h264decoder and used for pose recognition
        self.thread = None # thread of the Tkinter mainloop
        self.stopEvent = None

        # control variables
        self.distance = 0.1  # default distance for 'move' cmd
        self.degree = 30  # default degree for 'cw' or 'ccw' cmd

        # if the flag is TRUE,the auto-takeoff thread will stop waiting for the response from tello
        self.quit_waiting_flag = False

        # initialize the root window and image panel
        self.root = tki.Tk()
        self.panel = None

        # create buttons
        self.btn_snapshot = tki.Button(self.root, text="Take picture!",
                                       command=self.takeSnapshot)
        self.btn_snapshot.pack(side="bottom", fill="both",
                               expand="yes", padx=10, pady=5)

        # start a thread that constantly pools the video sensor for
        # the most recently read frame
        self.stopEvent = threading.Event()
        self.thread = threading.Thread(target=self.videoLoop, args=())
        self.thread.start()

        # set a callback to handle when the window is closed
        self.root.wm_title("TELLO Controller")
        self.root.wm_protocol("WM_DELETE_WINDOW", self.onClose)

        # the sending_command will send command to tello every 5 seconds
        self.sending_command_thread = threading.Thread(target = self._sendingCommand)

        # sends status of tello to server every 5 seconds
        self.sending_status = threading.Thread(target = self.sendTelloStatus)
        self.sending_status.start()

    def videoLoop(self):
        """
        The mainloop thread of Tkinter
        Raises:
            RuntimeError: To get around a RunTime error that Tkinter throws due to threading.
        """
        try:
            # start the thread that get GUI image and drwa skeleton
            time.sleep(0.5)
            self.sending_command_thread.start()
            while not self.stopEvent.is_set():
                system = platform.system()

            # read the frame for GUI show
                self.frame = self.tello.read()
                if self.frame is None or self.frame.size == 0:
                    continue

            # transfer the format from frame to image
                image = Image.fromarray(self.frame)

            # we found compatibility problem between Tkinter,PIL and Macos,and it will
            # sometimes result the very long preriod of the "ImageTk.PhotoImage" function,
            # so for Macos,we start a new thread to execute the _updateGUIImage function.
                self._updateGUIImage(image)
        except RuntimeError, e:
            print("[INFO] caught a RuntimeError")

    def _updateGUIImage(self,image):
        """
        Main operation to initial the object of image,and update the GUI panel
        """
        # image = TelloUI.crop(ImageTk.PhotoImage(image))
        # image = ImageTk.PhotoImage(image.crop((0,0,960,500)))
        image = ImageTk.PhotoImage(image)
        # if the panel none ,we need to initial it
        if self.panel is None:
            self.panel = tki.Label(image=image)
            self.panel.image = image
            self.panel.pack(side="left", padx=10, pady=10)
        # otherwise, simply update the panel
        else:
            self.panel.configure(image=image)
            self.panel.image = image

    def enqueue(self, arr, self_arr = None):
        f = open('flightpath.txt', 'w+')
        for cmd in arr:
            f.write(cmd + '\n')
        f.close()

        if self_arr:
            while len(self_arr) > 1:
                time.sleep(2)
                self.tello.send_command(self_arr.pop(0))
                time.sleep(3)
                self.takeSnapshot()
            self.tello.send_command('land')
        else:
            while len(arr) > 1:
                time.sleep(2)
                self.tello.send_command(arr.pop(0))
                time.sleep(3)
                self.takeSnapshot()
            self.tello.send_command('land')

        time.sleep(5)
        os.remove('flightpath.txt')

    def _sendingCommand(self):
        if not os.path.isfile('flightpath.txt'):
            URL = "https://pennappsxx.herokuapp.com/fetch"
            r = requests.get(url = URL, params = {})
            data = r.json()
            print(data)

            if data['status'] == True:
                if data['flight_plan'] == "LINE":
                    # self.enqueue(['takeoff','up 50','flip f','land'],['takeoff','up 50','forward 100','land'])
                    self.enqueue(['takeoff','up 100','forward 100','land'],['takeoff','up 50','forward 100','land'])
            # time.sleep(1)

    def sendTelloStatus(self):
        while os.path.isfile('flightpath.txt'):
            time.sleep(5)
            #send tello status to server
            t = self.tello
            URL = "https://penappsxx.herokuapp.com/info/"
            data = {
                'drone_id': t.address[0],
                'active': True,
                'battery': t.get_battery(),
                'flight_time': t.get_flight_time(),
                'speed': t.get_speed(),
                'model': 'tello'
            }
            r = requests.post(url = URL, data = data)

    def _setQuitWaitingFlag(self):
        """
        set the variable as TRUE,it will stop computer waiting for response from tello
        """
        self.quit_waiting_flag = True

    def upload_blob(self, source_file_name):
        """Uploads a file to the bucket."""
        print('Uploading file to GC.'.format(source_file_name))
        bucket_name = 'pennappsxx-drone-unprocessed'
        storage_client = storage.Client.from_service_account_json(
        'key.json')
        bucket = storage_client.get_bucket(bucket_name)
        blob = bucket.blob('unprocessed/' + source_file_name)

        blob.upload_from_filename(source_file_name)

        print('File {} uploaded to GC.'.format(source_file_name))

    def takeSnapshot(self):
        """
        save the current frame of the video as a jpg file and put it into outputpath
        """

        # grab the current timestamp and use it to construct the filename
        ts = datetime.datetime.now()
        filename = "{}.jpg".format(ts.strftime("%Y-%m-%d_%H-%M-%S"))

        p = os.path.sep.join((self.outputPath, filename))

        # save the file
        cv2.imwrite(p, cv2.cvtColor(self.frame, cv2.COLOR_RGB2BGR))
        print("[INFO] saved {}".format(filename))
        self.upload_blob(filename)

    def pauseVideo(self):
        """
        Toggle the freeze/unfreze of video
        """
        if self.btn_pause.config('relief')[-1] == 'sunken':
            self.btn_pause.config(relief="raised")
            self.tello.video_freeze(False)
        else:
            self.btn_pause.config(relief="sunken")
            self.tello.video_freeze(True)

    def updateTrackBar(self):
        self.my_tello_hand.setThr(self.hand_thr_bar.get())

    def updateDistancebar(self):
        self.distance = self.distance_bar.get()
        print 'reset distance to %.1f' % self.distance

    def updateDegreebar(self):
        self.degree = self.degree_bar.get()
        print 'reset distance to %d' % self.degree

    def onClose(self):
        """
        set the stop event, cleanup the camera, and allow the rest of

        the quit process to continue
        """
        print("[INFO] closing...")
        self.stopEvent.set()
        del self.tello
        self.root.quit()
