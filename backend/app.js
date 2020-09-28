var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require('path');

var upload = require('./upload');
var thumbnail = require('./thumbnail');

var tagsController = require('./tags-controller');
var recipeController = require('./recipe-controller');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.get('/tags', tagsController.getTags);

app.post('/tags', tagsController.addTag);

app.post('/recepie', recipeController.addRecipe);

app.get('/recepie/:recepieId', recipeController.getRecipe);

app.post('/recepie/search', recipeController.searchRecipe);

app.post('/images/upload', (req, res) => {
  upload.upload(req,res,function(err){
    if(req.fileValidationError) {
      console.log(req.fileValidationError);
      res.json({error_code:1,err_desc:"wrong file format only jpg is accepted."});
        return;
    }
    if(err){
      console.log(err);
      res.json({error_code:1,err_desc:err});
      return;
    }
    filename =  req.file && req.file.filename ? req.file.filename: "";
    path = "./public/images/" + filename;
    console.log(path)
    // only jpg and png are allowed to be uploaded
    if (path.includes(".jpg")){
      thumbnail.createThumbnail(path, path.substr(0, path.lastIndexOf(".jpg")) + "_thumb.jpg")
      thumbnail.createLarge(path, path.substr(0, path.lastIndexOf(".jpg")) + "_large.jpg")
    }
    else{
      thumbnail.createThumbnail(path, path.substr(0, path.lastIndexOf(".png")) + "_thumb.jpg")
      thumbnail.createLarge(path, path.substr(0, path.lastIndexOf(".png")) + "_large.jpg")
    }
    res.json({error_code:0,err_desc:null, filename: filename});
  })
});

app.delete('/images/:imageId', (req, res) => {
  var filename = req.params.imageId;
  if (filename){
    var path = __dirname + "/public/images/" +filename;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err)
      }
      else{
        console.log("File " + path + " was deleted.");
      }
    });
      path =  path.substr(0, path.lastIndexOf(".jpg")) + "_thumb.jpg";
      console.log(path)
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + path + " was deleted.");
        }
      });
      path =  path.substr(0, path.lastIndexOf(".jpg")) + "_large.jpg";
      console.log(path)
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err)
        }
        else{
          console.log("File " + path + " was deleted.");
        }
      });
      res.json({error_code:0,err_desc:null, message:"successfull deleted"});
  }
});

app.get('/collection', (req, res) => {
  var imgurl="http://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2017/06/dimsum-1.jpg";
  res.json([{name:"collection1", number:1, text: "Lorem Ipsum", imageUrl:imgurl},{name:"collection2", number:2, text: "Lorem Ipsum", imageUrl:imgurl},{name:"collection3", number:3, text: "Lorem Ipsum", imageUrl:"api/images/1591724229216.XZgui_thumb.jpg"},{name:"collection4", number:4, text: "Lorem Ipsum", imageUrl:"api/images/1591724229216.XZgui_thumb.jpg"}]);
});
app.get('/collection/:collectionId', (req, res) => {
  res.json({name:"collection1",imageUrl:"http://sf1.mariefranceasia.com/wp-content/uploads/sites/7/2017/06/dimsum-1.jpg", 
            text:"lorem ipsum und so weier hasjka iayvu iuoab", 
            number:parseInt(req.params.recepieId), 
            sections:[{name:"Suppe", description:"lecker", recipes:[{"_id":{"$oid":"5f12d8f8b3b0a4045e615978"},"name":"Rote Linsen-Kokos-Suppe","servings":4,"number":50,"imageUri":"1595070672453.iArxw.jpg","ingredients":[{"name":"Pizzatomaten (400 g)","quantity":0.25,"unit":"Dose"},{"name":"Kokosmilch (400 g)","quantity":0.25,"unit":"Dose"},{"name":"Zwiebel(n)","quantity":0.25,"unit":"Stück"},{"name":"Linsen, rote","quantity":43.75,"unit":"g"},{"name":"Chilipulver","quantity":0.75,"unit":"TL"},{"name":"Kurkuma","quantity":0.5,"unit":"TL"},{"name":"Gemüsebrühe","quantity":150,"unit":"ml"},{"name":"Sonnenblumenöl","quantity":0,"unit":""},{"name":"Salz","quantity":0,"unit":""}],"instructions":["Die Zwiebeln schälen und in feine Würfel schneiden. Im Sonnenblumenöl glasig anschwitzen. Rote Linsen, Tomaten mit Saft und Kokosmilch hinzufügen und gut umrühren. Mit der Gemüsebrühe aufgießen und die Suppe ca. 20 Minuten köcheln.","Zum Schluss mit Salz, Chili- und Kurkumapulver abschmecken.","Die Suppe schmeckt am nächsten Tag doppelt so gut. Dazu passen Garnelenspieße und Baguette."],"cookingDuration":5,"restDuration":20,"tags":["5e907bf10ce9ad2f9ce38298","5e907bf10ce9ad2f9ce38299","5e907bf10ce9ad2f9ce3829f","5e9edecf8614d52d6047b358","5e9ee0338614d52d6047b365","5e9ededc8614d52d6047b359"],"season":[]} ]}, 
                      {name:"Hauptspeise", description:"fair genug", recipes:[{"_id":{"$oid":"5f12e0d6b3b0a4045e615979"},"name":"Spinatstrudel mit getrockneten Tomaten und Walnüssen","servings":4,"number":51,"imageUri":"1595072677775.gdGXJ.jpg","ingredients":[{"name":"Rolle(n) Blätterteig, viereckig","quantity":0.25,"unit":"Stück"},{"name":"Tomate(n), getrocknete in Öl","quantity":2,"unit":"Stück"},{"name":"Handvoll Walnüsse","quantity":0.25,"unit":""},{"name":"Knoblauchzehe(n)","quantity":0.25,"unit":""},{"name":"Olivenöl","quantity":0,"unit":"etwas"},{"name":"Blattspinat, frisch","quantity":50,"unit":"g"},{"name":"Zwiebel(n)","quantity":0.25,"unit":""},{"name":"Gemüsebrühe zum Ablöschen","quantity":0,"unit":"etwas"},{"name":"Salz und Pfeffer","quantity":0,"unit":""}],"instructions":["De Tomaten, die Walnüsse, eine Knoblauchzehe und einen guten Schuss Olivenöl in einen Mixer geben und daraus ein Pesto herstellen. Mit Salz und Pfeffer würzen.","Zwiebel und Knoblauch würfeln, in etwas Olivenöl in einer Pfanne glasig dünsten und mit ein wenig Gemüsebrühe ablöschen. Dann Spinat dazugeben und einige Minuten mitdünsten, bis er zusammenfällt. Mit Salz und Pfeffer würzen.","Den Blätterteig auf einem Backblech ausbreiten und großzügig mit dem Tomatenpesto bestreichen. Danach den Spinat darauf verteilen und von der langen Seite her zu einem Strudel rollen. Wichtig: Mit dem Schluss nach unten auf das Backblech legen, damit er schön zu bleibt.","Mit etwas Wasser bestreichen und bei 200 °C Ober-/Unterhitze backen, bis der Blätterteig goldbraun ist. Das dauert ca. 20 Minuten.","Optional bietet sich natürlich ein Knoblauchdip oder auch eine Tomatensoße dazu an; uns hat es aber auch ohne sehr gut geschmeckt."],"cookingDuration":30,"restDuration":20,"tags":["5e907bf10ce9ad2f9ce38299","5e9edecf8614d52d6047b358","5e9edfa58614d52d6047b35f","5e9ee03e8614d52d6047b366","5f54dd05e23547038ae2cdac","5e9ee0338614d52d6047b365"],"season":[]},{"_id":{"$oid":"5f12e95402ece80827148852"},"name":"Bunte Nudeln mit grünem Spargel in einer Sahne-Zitronen-Sauce","servings":3,"number":53,"imageUri":"1595074890561.FeqXQ.jpg","ingredients":[{"name":"Bandnudeln","quantity":166.66666666666666,"unit":"g"},{"name":"grüner Spargel","quantity":166.66666666666666,"unit":"g"},{"name":"Zucchini (mittelgroß)","quantity":0.3333333333333333,"unit":"Stück"},{"name":"Frühlingszwiebeln","quantity":1,"unit":"Stück"},{"name":"Kirschtomaten","quantity":66.66666666666667,"unit":"g"},{"name":"Zitrone, unbehandelt","quantity":0.3333333333333333,"unit":"Stück"},{"name":"Sahne","quantity":83.33333333333333,"unit":"ml"},{"name":"Olivenöl","quantity":0,"unit":""},{"name":"Salz und Pfeffer","quantity":0,"unit":""},{"name":"Chilischote","quantity":0,"unit":"etwas"},{"name":"Paprikapulver","quantity":0,"unit":"etwas"},{"name":"Parmesan","quantity":0,"unit":""}],"instructions":["In einem großen Topf Wasser mit etwas Salz zum Kochen bringen und die bunte Pasta darin garen. Derweil grünen Spargel lediglich von seinen holzigen Enden befreien (nicht schälen) und in ca. 3-4 cm große Stücke schneiden, Zucchini waschen und in Scheiben schneiden und beides in einer separaten Pfanne ca. 7-10 Minuten in gutem Olivenöl kräftig andünsten, mit Salz und Pfeffer würzen. Pfanne vom Herd nehmen, wenn der Spargel bissfest ist.","Frühlingsziebeln waschen und fein hacken. In einer weiteren (großen, in der das gesamte Gericht gekocht werden kann) Pfanne (oder Schmortopf) Olivenöl erhitzen, gehackte Frühlingszwiebeln dazugeben und die zuvor gut gewaschene Zitronenschale komplett in die Pfanne reiben. Alles etwas schmoren lassen, danach mit Sahne und dem Saft der komplett ausgepressten Zitrone ablöschen und alles etwas köcheln/reduzieren lassen. Mit Salz, Pfeffer, Paprikapulver und etwas Chilischote nach Belieben abschmecken, wobei die Sauce eine durch die Zitrone eine frische Note behalten sollte.","Derweil die Kirschtomaten waschen und halbieren. Die mittlerweile fertigen Nudeln sowie Spargel, Zucchini und die Kirschtomaten in die Sahnesauce geben und alles bei ordentlicher Hitze gut vermengen. Mit frisch gehobeltem Parmesan servieren.","Dazu passt ein schönes Glas leichter Weißwein."],"cookingDuration":45,"restDuration":null,"tags":["5e9ee0338614d52d6047b365","5e907bf10ce9ad2f9ce3829a","5e907bf10ce9ad2f9ce38298","5e9edecf8614d52d6047b358"],"season":[4,5,6]}]}, 
                      {name:"desert", description:"für feinsmecker", recipes:[{"_id":{"$oid":"5f12ea5902ece80827148853"},"name":"Dal-Linseneintopf mit Blattspinat","servings":4,"number":54,"imageUri":"1599391162570.wgmAL.jpg","ingredients":[{"name":"rote Linsen","quantity":125,"unit":"g"},{"name":"Kurkuma","quantity":0.25,"unit":"TL"},{"name":"Kokos- oder Sonnenblumenöl","quantity":0.5,"unit":"EL"},{"name":"Kreuzkümmel","quantity":0.5,"unit":"TL"},{"name":"rote Zwiebeln (mittelgroß)","quantity":1,"unit":"Stück"},{"name":"nach Belieben Blattspinat (alternativ Mangold oder Erbsen, auch tiefgekühlte)","quantity":0,"unit":""},{"name":"optional: Butter, Ghal, rote Chili, schwarze Senfsaat, frische Curryblätter, Eier, Mango-Chutney","quantity":0,"unit":""},{"name":"als Beilage: Basmati-Reis","quantity":0,"unit":""}],"instructions":["Die Linsen in Wasser mit dem Kurkuma cremig-weich kochen (meist im Verhältnis 1:3 für 10-15 Minuten, das variiert aber, deshalb am besten die Packungsangaben beherzigen).","In einer beschichteten Pfanne das Kokos- oder Sonnenblumenöl erhitzen und darin den Kreuzkümmel anrösten.","Die Zwiebeln in sehr feine Ringe schneiden oder hobeln und im Öl behutsam anrösten. Sie sollten braun und intensiv karamellig werden, ohne anzubrennen, was zehn Minuten dauert.","Am Ende die Zwiebeln unter die Linsen ziehen und alles mit Salz abschmecken. Nach Belieben kurz blanchierten Blattspinat, Mangold oder Erbsen (auch tiefgekühlt) dazugeben. Dazu passt Basmatireis.","Tipp: Das Gericht lässt sich nach Belieben erweitern: Ein Stich Ghee oder Butter macht es üppiger und runder. Wenn man im Ghee für 1 Minute schwarze Senfsaat, rote Chili und – besonders fein – ein paar (am besten frische) Curryblätter anröstet und unterzieht, wird der Teller komplexer. Mit einem weich gekochten oder pochierten Ei und Mango-Chutney wird eine große Mahlzeit daraus.","Rezept von hier: https://rezept.sz-magazin.de/rezept/dal-linsenseintopf-mit-blattspinat-indisch-vegetarisch-einfach/"],"cookingDuration":30,"restDuration":null,"tags":["5e907bf10ce9ad2f9ce38299","5e9edecf8614d52d6047b358","5e9ee0338614d52d6047b365"],"season":[]}]}
                    ]
            });
});

// GET home page.
var path = require('path');
app.get('/', (req, res) => {
  sendIndex(res);
});

app.use((req, res) => {
  sendIndex(res);
 });

const indexPath = path.join(__dirname, '/public/index.html');
function sendIndex(res){
  res.status(200).sendFile(indexPath); 
} 

var fs = require('fs');
var url = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')).url;
   
//start server
var server_port = 8080;
app.listen(server_port, function () {
  console.log("Listening on port " , server_port)
});