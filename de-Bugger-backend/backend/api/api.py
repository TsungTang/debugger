import uvicorn
from app.main import app
import argparse


if __name__ == "__main__":
    def printTitle(title):
        print(f'-'*(len(title)-9+4))
        print(f'| {title} |')
        print(f'-'*(len(title)-9+4))

    parser = argparse.ArgumentParser()
    parser.add_argument('-port', metavar='PPPP', type=int, 
                        dest='port', action='store', default=8100,
                        help='port number for the api service')
    args = parser.parse_args()
    title = f"start de Bugger API at sport \033[36m{args.port}\033[0m"
    printTitle(title)
    uvicorn.run("api:app", host="0.0.0.0", port=args.port, reload=True)
