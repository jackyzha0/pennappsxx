import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import { PDFViewer } from '@react-pdf/renderer';
import graph from './scatterplot.jpg';
import coords from './infographic.png';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer style={{display: "flex", width: "100%", height: "1000px"}}>
    <MyDocument />
  </PDFViewer>
);

const render = () => {
  ReactDOM.render(<App />, document.getElementById('pdf_root'));
}

const MyDocument = () => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Text style={styles.title}>Documentation of Debris Locations</Text>
      <Text style={styles.author}>Project SID</Text>
      <Image
        style={styles.image}
        src={graph}
      />
      <Text style={styles.subtitle}>
        Plastic Waste Locations
      </Text>
      <Image
        style={styles.image}
        src={coords}
      />
      <Text style={styles.text}>
        From the reports we have seen above, these are the projected locations for plastic waste coordinates.
        This report will be sent to authorities and alerted through social media for assistance in public efforts.
      </Text>
      <Text style={styles.text}>
        Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
        ocioso (que eran los más del año) se daba a leer libros de caballerías
        con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
        la caza, y aun la administración de su hacienda; y llegó a tanto su
        curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
        sembradura, para comprar libros de caballerías en que leer; y así llevó
        a su casa todos cuantos pudo haber dellos; y de todos ningunos le
        parecían tan bien como los que compuso el famoso Feliciano de Silva:
        porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
        parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
        cartas de desafío, donde en muchas partes hallaba escrito: la razón de
        la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
        que con razón me quejo de la vuestra fermosura, y también cuando leía:
        los altos cielos que de vuestra divinidad divinamente con las estrellas
        se fortifican, y os hacen merecedora del merecimiento que merece la
        vuestra grandeza.
      </Text>
      <Text style={styles.text}>
        Con estas y semejantes razones perdía el pobre caballero el juicio, y
        desvelábase por entenderlas, y desentrañarles el sentido, que no se lo
        sacara, ni las entendiera el mismo Aristóteles, si resucitara para sólo
        ello. No estaba muy bien con las heridas que don Belianis daba y
        recibía, porque se imaginaba que por grandes maestros que le hubiesen
        curado, no dejaría de tener el rostro y todo el cuerpo lleno de
        cicatrices y señales; pero con todo alababa en su autor aquel acabar su
        libro con la promesa de aquella inacabable aventura, y muchas veces le
        vino deseo de tomar la pluma, y darle fin al pie de la letra como allí
        se promete; y sin duda alguna lo hiciera, y aun saliera con ello, si
        otros mayores y continuos pensamientos no se lo estorbaran. Tuvo muchas
        veces competencia con el cura de su lugar (que era hombre docto graduado
        en Sigüenza), sobre cuál había sido mejor caballero, Palmerín de
        Inglaterra o Amadís de Gaula; mas maese Nicolás, barbero del mismo
        pueblo, decía que ninguno llegaba al caballero del Febo, y que si alguno
        se le podía comparar, era don Galaor, hermano de Amadís de Gaula, porque
        tenía muy acomodada condición para todo; que no era caballero
        melindroso, ni tan llorón como su hermano, y que en lo de la valentía no
        le iba en zaga.
      </Text>
      <Text style={styles.text}>
        En resolución, él se enfrascó tanto en su lectura, que se le pasaban las
        noches leyendo de claro en claro, y los días de turbio en turbio, y así,
        del poco dormir y del mucho leer, se le secó el cerebro, de manera que
        vino a perder el juicio. Llenósele la fantasía de todo aquello que leía
        en los libros, así de encantamientos, como de pendencias, batallas,
        desafíos, heridas, requiebros, amores, tormentas y disparates
        imposibles, y asentósele de tal modo en la imaginación que era verdad
        toda aquella máquina de aquellas soñadas invenciones que leía, que para
        él no había otra historia más cierta en el mundo.
      </Text>
      <Text style={styles.subtitle} break>
        Trash Disposal Coordinates
      </Text>
      <Image
        style={styles.image}
        src={coords}
      />
      <Text style={styles.text}>
        From the reports we have seen above, these are the projected locations for plastic waste coordinates.
        This report will be sent to authorities and alerted through social media for assistance in public efforts.
      </Text>
      <Text style={styles.text}>
        Yendo, pues, caminando nuestro flamante aventurero, iba hablando consigo
        mesmo, y diciendo: —¿Quién duda, sino que en los venideros tiempos,
        cuando salga a luz la verdadera historia de mis famosos hechos, que el
        sabio que los escribiere no ponga, cuando llegue a contar esta mi
        primera salida tan de mañana, desta manera?: Apenas había el rubicundo
        Apolo tendido por la faz de la ancha y espaciosa tierra las doradas
        hebras de sus hermosos cabellos, y apenas los pequeños y pintados
        pajarillos con sus arpadas lenguas habían saludado con dulce y meliflua
        armonía la venida de la rosada Aurora, que, dejando la blanda cama del
        celoso marido, por las puertas y balcones del manchego horizonte a los
        mortales se mostraba, cuando el famoso caballero don Quijote de la
        Mancha, dejando las ociosas plumas, subió sobre su famoso caballo
        Rocinante y comenzó a caminar por el antiguo y conocido Campo de
        Montiel.
      </Text>
      <Text style={styles.text}>
        Y era la verdad que por él caminaba; y añadió diciendo: —Dichosa edad y
        siglo dichoso aquel adonde saldrán a luz las famosas hazañas mías,
        dignas de entallarse en bronces, esculpirse en mármoles y pintarse en
        tablas, para memoria en lo futuro. ¡Oh tú, sabio encantador, quienquiera
        que seas, a quien ha de tocar el ser coronista desta peregrina historia!
        Ruégote que no te olvides de mi buen Rocinante, compañero eterno mío en
        todos mis caminos y carreras.
      </Text>
      <Text style={styles.text}>
        Luego volvía diciendo, como si verdaderamente fuera enamorado: —¡Oh
        princesa Dulcinea, señora deste cautivo corazón! Mucho agravio me
        habedes fecho en despedirme y reprocharme con el riguroso afincamiento
        de mandarme no parecer ante la vuestra fermosura. Plégaos, señora, de
        membraros deste vuestro sujeto corazón, que tantas cuitas por vuestro
        amor padece. Con estos iba ensartando otros disparates, todos al modo de
        los que sus libros le habían enseñado, imitando en cuanto podía su
        lenguaje. Con esto caminaba tan despacio, y el sol entraba tan apriesa y
        con tanto ardor, que fuera bastante a derretirle los sesos, si algunos
        tuviera
      </Text>
      <Text style={styles.text}>
        Casi todo aquel día caminó sin acontecerle cosa que de contar fuese, de
        lo cual se desesperaba, porque quisiera topar luego luego con quien
        hacer experiencia del valor de su fuerte brazo. Autores hay que dicen
        que la primera aventura que le avino fue la del Puerto Lápice, otros
        dicen que la de los molinos de viento; pero lo que yo he podido
        averiguar en este caso, y lo que he hallado escrito en los anales de la
        Mancha, es que él anduvo todo aquel día, y, al anochecer, su rocín y él
        se hallaron cansados y muertos de hambre, y que, mirando a todas partes
        por ver si descubriría algún castillo o alguna majada de pastores donde
        recogerse y adonde pudiese remediar su mucha hambre y necesidad, vio, no
        lejos del camino por donde iba, una venta,que fue como si viera una
        estrella que, no a los portales, sino a los alcázares de su redención le
        encaminaba. Diose priesa a caminar, y llegó a ella a tiempo que
        anochecía.
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  statusBar: {
    flexFlow: 'row',
    height: '100px',
    width: '100%',
    borderBottom: '1px solid #CCCCCC',
    color: 'white',
    display: 'flex',
  }
});

class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      isLoaded: false
    }
  }

  componentDidMount() {
    setTimeout(() => {this.setState({isLoaded: true})}, 4000);

    fetch(this.props.json, { method: 'GET' })
      // .then(res => {return JSON.parse(res)})
      .then(res => {return res.json()})
      .then(res => {console.log('RES IS ', res  ); return res})
      .then(res => this.setState({content: res}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={{height: 500, width: "100%", color: '#FFFFFF'}}>
        {this.state.isLoaded && <p>"2019-09-07_21-56-09.jpg": [], "2019-09-07_21-56-28.jpg": [], "2019-09-07_21-56-16.jpg": [], "2019-09-07_21-56-22.jpg": [], "2019-09-08_00-29-31.jpg": [], "2019-09-08_00-20-15.jpg": [], "2019-09-08_00-21-40.jpg": [], "2019-09-08_00-21-33.jpg": [], "2019-09-08_00-29-50.jpg": [], "2019-09-08_00-29-44.jpg": [], "2019-09-08_00-38-24.jpg": [], "2019-09-08_00-38-30.jpg": [], "2019-09-08_00-38-36.jpg": [], "2019-09-08_00-20-27.jpg": [], "2019-09-08_00-38-42.jpg": [], "2019-09-08_00-20-08.jpg": [], "2019-09-08_00-29-38.jpg": [], "2019-09-08_00-20-21.jpg": [], "2019-09-08_02-58-49.jpg": [], "2019-09-08_02-58-37.jpg": [], "2019-09-08_02-58-55.jpg": [], "2019-09-08_02-58-44.jpg": [], "2019-09-08_03-16-06.jpg": [], "2019-09-08_03-16-19.jpg": [], "2019-09-08_03-16-13.jpg": [], "2019-09-08_03-17-54.jpg": [], "2019-09-08_03-18-00.jpg": [], "2019-09-08_03-18-06.jpg": [["bottle", 84.86709594726562]], "2019-09-08_03-54-14.jpg": [], "2019-09-08_03-54-21.jpg": [], "2019-09-08_03-54-26.jpg": [["bottle", 60.138893127441406]], "2019-09-08_03-54-32.jpg": [], "2019-09-08_04-00-00.jpg": [], "2019-09-08_04-00-06.jpg": [], "2019-09-08_04-01-09.jpg": [], "2019-09-08_04-01-15.jpg": [], "2019-09-08_04-01-21.jpg": [], "2019-09-08_04-01-27.jpg": [], "2019-09-08_04-03-17.jpg": [], "2019-09-08_04-03-29.jpg": [["fork", 94.31998133659363], ["bottle", 34.4969242811203]], "2019-09-08_04-03-24.jpg": [], "2019-09-08_04-03-35.jpg": []</p>}
      </div>);
  }
}


export default class DataScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      json: ''
    };
    this.fetchImages = this.fetchImages.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    const URL = 'https://www.googleapis.com/storage/v1/b/pennappsxx-drone-unprocessed/o?prefix=processed';
    let response = await fetch(URL, { method: 'GET' });
    let data = await response.json();

    const names = data.items.map(item => {
      return item.name.replace(/\//g, "%2F");
    });

    const urls = names.map(name => {
      return 'https://www.googleapis.com/storage/v1/b/pennappsxx-drone-unprocessed/o/' + name + '?alt=media';
    });

    const promises = urls.map(url => {
      return fetch(url, { method: 'GET' });
    });

    Promise.all(promises)
      .then(res => {
        console.log(res);
        const urls = this.state.images.map(img => img.url);
        const json_file = urls.filter(url => {return url.indexOf('.json') > -1});
        const filtered_img = urls.filter(url => {return url.indexOf('.json') === -1});
        const new_urls = filtered_img.map(url => {
          return {
            src: url,
            width: 1,
            height: 1
          }
        });
        console.log('json file is ', json_file);
        this.setState({ images: new_urls, json: json_file })
      })
      .catch(err => console.log('error', err))
  }

  render() {
    return (
      <div style={{borderRight: '1px solid #CCCCCC'}}>

        <div className="page-container" style={styles.statusBar}>
          <div style={{display: 'flex', flexFlow: 'column', justifyContent:'center',alignItems:'center'}}>
            <h1>Report</h1>
            <p style={{paddingLeft: '4rem', paddingRight: '4rem'}}>Click on "Generate PDF" to create a document detailing coordinates of these massive waste disposals.</p>
          </div>

          <div style={{height: '100%', width: '200px', display: 'flex', flexFlow: 'column', justifyContent: 'flex-end'}}>
            <div style={{display: "flex", justifyContent: "center", marginTop: "10px", marginRight: "10px", marginBottom: "10px"}}>
              <button className="medium ui green button" onClick={() => render()}>
                Generate PDF
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', height: '100%', width:'100%'}}>
          <div style={{ height: "100%", width: '70%'}} id="pdf_root">
          </div>

          <div style={{height: '100%', borderLeft: '1px solid #CCCCCC', width: '30%'}}>
            <h1 style={{color: '#CCCCCC'}}>Analysis</h1>
            <StatsPanel json={this.state.json}/>
          </div>
        </div>

      </div>
    )
  }
}
