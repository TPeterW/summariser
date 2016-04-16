# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import urlparse
import re

class HtmlParser(object):
    def __init__(self):
        pass
        
    def search(self, content):
        soup = BeautifulSoup(content, 'html.parser', from_encoding='utf-8')
        return self._get_new_url(soup)
    
    def _get_new_url(self, soup):
        wiki_url = 'https://wikipedia.org/'
        links = soup.find_all('a', href=re.compile(r'/wiki/[0-9a-zA-Z]+'))
        new_url = links[1]['href']
        new_full_url = urlparse.urljoin(wiki_url, new_url)
        return new_full_url