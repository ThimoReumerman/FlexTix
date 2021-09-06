import multer, { StorageEngine, Options, Multer } from 'multer';

const storageEngine: StorageEngine = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    callback(null, './public/uploads');
  },
  filename: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload: Multer = multer({storage: storageEngine});

export default upload;