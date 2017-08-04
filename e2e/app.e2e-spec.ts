import { AkibakerywebPage } from './app.po';

describe('akibakeryweb App', () => {
  let page: AkibakerywebPage;

  beforeEach(() => {
    page = new AkibakerywebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
