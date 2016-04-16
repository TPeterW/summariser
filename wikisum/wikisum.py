# -*- coding: utf-8 -*-

# import url_manager, html_downloader, html_parser, output
from url_manager import UrlManager
from downloader import HtmlDownloader
from html_parser import HtmlParser
import signal, sys

class Crawler(object):
    def __init__(self):
        self.manager = UrlManager()
        self.downloader = HtmlDownloader()
        self.parser = HtmlParser()

    def get_urls(self, keywords):
        data = {}
        for word in keywords:
            url = self.crawl(word)
            data[word] = url;
        
        return data
    
    def crawl(self, word):
        results = {}
        url = self.manager.get_url(word);
        page = self.downloader.download(url)
        
        return self.parser.search(page)
