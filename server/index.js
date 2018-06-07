require('dotenv').config();
const express = require('express')
, session = require('express-session')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, massive = require('massive')
,bodyParser = require('body-parser')




const {
    SERVER_PORT,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SESSION_SECRET
} = process.env

const app = express();
app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json()); 

massive(CONNECTION_STRING).then((db)=> {
    console.log('Database Connected')
    app.set('db', db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:true
}))

app.use(passport.initialize());

app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done)=> {
    let db = app.get('db');
    let {displayName, picture, id} = profile;
    db.find_user([id]).then((foundUser)=> {
        if(foundUser[0]){
            done(null, foundUser[0].id)
        } else {
            // db.addUser([displayName, picture, id]).then((user)=>{
            //     done(null, user[0].id)
            // }).then
            db.addEmployee([displayName, id, picture]).then((employee)=> {
                done(null, employee[0].id)
            })

        }
    })
}))
passport.serializeUser((id, done)=> {
    done(null, id);
})

passport.deserializeUser((id, done)=> {
    app.get('db').find_session_user([id]).then((employee)=> {
        done(null, employee[0])
    })
})

app.get('/', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT
    
}))

app.get('/auth/me', function (req, res){
    if(req.user) {
        res.status(200).send(req.user)
       
    } else {
        res.status(401).send('Not Authorized')
    }
})

app.get('/api/journal/', (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.findJournalEntries()
    .then(journal => {res.status(200).send(journal);
        console.log(journal);
   }).catch(err => {
    console.log(err);
    res.status(500).send(err)
});
}
)
app.post('/api/journal/', (req, res, next)=> {
    let{emid, message} = req.body;
    req.app.get('db').addJournalEntry([emid, message]).then(ok=>{
        res.sendStatus(200);
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})



app.listen(SERVER_PORT, ()=> {
    console.log(`Yo bitch stuff is happening on: ${SERVER_PORT}`)
})