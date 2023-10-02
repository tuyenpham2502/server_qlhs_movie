import { array, date, number, object, string, TypeOf } from 'zod';

export const createFilmSchema = object({
    body: object({
        title: string({ required_error: 'Title is required' }),
        description: string().max(1000, 'Description must be less than 1000 characters'),
        filmBanner: array(string({ required_error: 'Film Banner is required' })),
        filmImage: string({ required_error: 'Film Image is required' }),
        releaseDate: string({required_error: 'Release Date is required' }).refine((dateString) => {
            return !isNaN(new Date(dateString).getDate());
        }, { message: 'Invalid date' }),
        time: string({ required_error: 'Time is required' }),
        age: number({ required_error: 'Age is required' }),
        quality: string({ required_error: 'Quality is required' }),
        genre: array(string({ required_error: 'Genre is required' })),
        filmType: string({ required_error: 'Film Type is required' }),
        country: string({ required_error: 'Country is required' }),
        director: array(string({ required_error: 'Director is required' })),
        cast: array(string({ required_error: 'Cast is required' })),
        trailer: string({ required_error: 'Trailer is required' }),
    }),
});

export type CreateFilmInput = TypeOf<typeof createFilmSchema>['body'];