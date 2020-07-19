const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routs/home')
const addRoutes = require('./routs/addCourse')
const coursesRoutes = require('./routs/courses')
const cardRoutes = require('./routs/card')
const newsRouters = require('./routs/news')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'views', 'index.html'))
//     res.render('index', {
//         title: 'Home page',
//         isHome: true
//     })
// })
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/news', newsRouters)

const PORT = process.eventNames.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})