import {ConversionType, ConverterService} from './converterService';
import express, {Request, Response} from 'express';

const app = express();
const port = 3000;

app.post('/html', (req: Request, res: Response) => {
    const converterService = new ConverterService(req.query.input, ConversionType.MARKDOWN)
    return res.send(converterService.run())
});

app.post('/markdown', (req: Request, res: Response) => {
    const converterService = new ConverterService(req.query.input, ConversionType.MARKDOWN)
    return res.send(converterService.run())
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

