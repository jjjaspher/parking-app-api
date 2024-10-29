import Express from "express";
import Routes from './routes';
require('dotenv').config();


// initialize express
const app = Express();

app.use(Express.json());
app.use(Routes);

const port = process.env.PORT;

// app.get('*', (_req: Request, res: Response) => {
//   res.send('Hello dev');
// });
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
