from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from cStringIO import StringIO
from ast import literal_eval
import argparse





ESCAPES = ''.join([chr(char) for char in range(1, 32)])

def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
    fp = file(path, 'rb')
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos=set()

    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
        interpreter.process_page(page)

    text = retstr.getvalue()

    fp.close()
    device.close()
    retstr.close()

    text = text.translate(None, ESCAPES)
    print text
    return text

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='convert a pdf to text')
    parser.add_argument('pdf_file', type=str,
                   help='This is the path to the pdf')
    args = parser.parse_args()

    convert_pdf_to_txt(args.pdf_file)
