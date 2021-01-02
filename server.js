import app from './src/app';
import db from './src/database';
import { PORT } from './config'; 


(async () => await db.sync())();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));