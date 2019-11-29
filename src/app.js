const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()
const port=process.env.PORT || 3000

const proxy=process.env.HTTP_PROXY 

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
/*
app.get('/help',(req,res)=> {
	res.send({
		name : 'Fabrizio',
		età: 55
	})
})

app.get('/about',(req,res)=> {
	res.send('<h1>About !!</h1>');
})
*/
app.get('/help',(req,res)=> {
	res.render('help',{
		title : 'data',
		message: 'ritotna i dati trovati',
		footermsg : 'Creata da Fabrizio'
	})
})

app.get('',(req,res)=> {
	res.render('index',{
		title:'Tempo',
		name:'Fabrizio',
		footermsg : 'Creata da Fabrizio'
	})
})
app.get('/about',(req,res)=> {
	res.render('about',{
		title:'About',
		name:'Isabella',
		footermsg : 'Creata da Fabrizio'
	})
})

app.get('/wheater',(req,res)=> {
	if(!req.query.address) {
		return res.render('404',{
			title:'wheater',
			error:'address non definito',
			footermsg : 'Creata da Fabrizio'
		})
	}
	geocode(req.query.address, proxy ,(error, {location,latitude,longitude} = {} ) => {
        if (error) {
            return res.send({
				error : error,
			});
        }

        forecast(latitude, longitude, proxy, (error, forecastData) => {
            if (error) {
                return res.send({
					error : error,
				})
			}
			res.send({
				forecast : forecastData,
				location ,
				address : req.query.address
			});
        })
    })
})

app.get('/products',(req,res)=> {
	console.log(req.query.search);
	if(!req.query.search) {
		return res.send({
			error : "deve essere fornito un parametro search valido"
		})
	}	
	res.send({
		products : []
	});
})

app.get('/help/*',(req,res)=> {
	res.render('404',{
		title:'404',
		error:'Help non trovato',
		footermsg : 'Creata da Fabrizio'
	})
})

app.get('*',(req,res)=> {
	res.render('404',{
		title:'404',
		error:'Pagina non trovata',
		footermsg : 'Creata da Fabrizio'
	})
})

app.listen(port,() => {
	console.log('Il server è attivo sulla porta 3000 con proxy = ' + proxy);
});
