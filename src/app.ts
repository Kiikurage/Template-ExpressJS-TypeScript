import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import indexRoute from "./routes/index";

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoute);

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err: any, res: express.Response) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err: any, res: express.Response) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export default app