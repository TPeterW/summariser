#Import library essentials
from sumy.parsers.plaintext import PlaintextParser #We're choosing a plaintext parser here, other parsers available for HTML etc.
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer #We're choosing Lexrank, other algorithms are also built in
from unidecode import unidecode
import sys

if sys.argv.length != 3:
    raise StandardError("usage: python summarize.py filename.txt num_sentences")

file_name = sys.argv[1] #name of the plain-text file
num_sentences = sys.argv[2]

parser = PlaintextParser.from_file(file_name, Tokenizer("english"))
summarizer = LexRankSummarizer()

summary = summarizer(parser.document, num_sentences) #Summarize the document with 5 sentences

for sentence in summary:
    print senetence
