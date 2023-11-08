export class constant {
    
    
    static readonly scheduleDeleteFilmTime = '*/5 * * * * * *';

    static sortType = {
        ASC: 'ASC',
        DESC: 'DESC'
    }

    static readonly lastWeekDateTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);


}