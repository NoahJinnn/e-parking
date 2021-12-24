import logging

logger = logging.getLogger("AAAA")

logging.basicConfig(level=logging.DEBUG, filename='myapp.log', format='%(asctime)s %(levelname)s:%(message)s')
if __name__ == '__main__':
    logging.debug("this file has %d words")
