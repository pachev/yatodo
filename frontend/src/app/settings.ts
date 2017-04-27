export class Settings {

    public baseUrl = 'http://localhost:8000/api/';
    public itemUrl = `${this.baseUrl}items`;
    public baseUserUrl = `${this.baseUrl}users/`; 
    public groupUrl = `${this.baseUrl}groups`;
    public groupCountUrl = `${this.itemUrl}/search/countByGroup_NameAndCompletedFalse`;
    

}
