export class Settings {

    public baseUrl = 'https://yatodo-api.pachevjoseph.com/api/';
    public itemUrl = `${this.baseUrl}items`;
    public baseUserUrl = `${this.baseUrl}users/`; 
    public groupUrl = `${this.baseUrl}groups`;
    public groupCountUrl = `${this.itemUrl}/search/countByGroup_NameAndCompletedFalse`;
    

}
