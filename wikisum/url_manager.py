# -*- coding: utf-8 -*-

import re

class UrlManager(object):
    def __init__(self):
        self.new_urls = set()
        self.old_urls = set()
        
    def get_url(self, word):
        base_url = 'https://en.wikipedia.org/w/index.php?title=Special:Search&profile=default&fulltext=Search&search='
        return base_url + word
            
    @staticmethod
    def check_validity(url):
        if not re.match('http[s]?://.*', url):
            url = 'http://' + url
        return url