import App from '@/app';
import IndexRoute from '@routes/index.route';
import DrugsRoute from '@routes/drugs.route';
import CountriesRoute from '@routes/countries.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
    new IndexRoute(),
    new DrugsRoute(),
    new CountriesRoute()
]);

app.listen();
