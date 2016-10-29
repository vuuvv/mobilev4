import { Mobilev4Page } from './app.po';

describe('mobilev4 App', function() {
  let page: Mobilev4Page;

  beforeEach(() => {
    page = new Mobilev4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
