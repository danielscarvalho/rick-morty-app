function RickMortyController() {

    this.getCharacters = (parameter, value) => {
        fetch(`https://rickandmortyapi.com/api/character/?${parameter}=${value}`)
            .then(response => response.json())
            .then(characters => {
                console.log('page number -> ' + characters.info.pages);
                this.pageSize = characters.info.pages;
                console.log(characters.results);
                RickMortyController.buildCharacters(characters.results);
            }).catch(error => console.log(error));
    }

    this.getLocations = (parameter, value) => {
        fetch(`https://rickandmortyapi.com/api/location/?${parameter}=${value}`)
            .then(response => response.json())
            .then(locations => {
                console.log('page number -> ' + locations.info.pages);
                this.pageSize = locations.info.pages;
                console.log(locations.results);
                RickMortyController.buildLocations(locations.results);
            }).catch(error => console.log(error));
    }

    this.getEpisodes = (parameter, value) => {
        fetch(`https://rickandmortyapi.com/api/episode/?${parameter}=${value}`)
            .then(response => response.json())
            .then(episodes => {
                console.log('page number -> ' + episodes.info.pages);
                this.pageSize = episodes.info.pages;
                console.log(episodes.results);
                RickMortyController.buildEpisodes(episodes.results);
            }).catch(error => console.log(error));
    }

    this.buildCharacters = (results) => {
        let endPoint = 'character';
        const cardContainerHTML = ``;
        cardContainerHTML += `
            <input id="input-search" onclick="RickMortyController.seachTerm('${endPoint}'))"></input>
        `;

        results.forEach(item => {
            cardContainerHTML += `
                <div>${item.name}</div>
            `;
        });

        cardContainerHTML += `
            <button onclick="RickMortyController.next('${endPoint}')"><</button>
            <button onclick="RickMortyController.previuos('${endPoint}')">></button>
        `;
        $('container').html(cardContainerHTML);
    }

    this.buildLocations = (results) => {
        let endPoint = 'location';
        const cardContainerHTML = ``;
        cardContainerHTML += `
            <input id="input-search" onclick="RickMortyController.seachTerm('${endPoint}'))"></input>
        `;

        results.forEach(item => {
            cardContainerHTML += `
                <div>${item.name}</div>
            `;
        });

        cardContainerHTML += `
            <button onclick="RickMortyController.next('${endPoint}')"><</button>
            <button onclick="RickMortyController.previuos('${endPoint}')">></button>
        `;
        $('container').html(cardContainerHTML);
    }

    this.buildEpisodes = (results) => {
        let endPoint = 'episode';
        const cardContainerHTML = ``;
        cardContainerHTML += `
            <input id="input-search" onclick="RickMortyController.seachTerm('${endPoint}'))"></input>
        `;

        results.forEach(item => {
            cardContainerHTML += `
                <div>${item.name}</div>
            `;
        });

        cardContainerHTML += `
            <button onclick="RickMortyController.next('${endPoint}')"><</button>
            <button onclick="RickMortyController.previuos('${endPoint}')">></button>
        `;
        $('container').html(cardContainerHTML);
    }

    this.pageSize = 0;
    this.currentPage = 1;

    this.next = (endPoint) => {
        if (this.currentPage < this.pageSize) {
            this.currentPage++;
            RickMortyController.directEndPoint(endPoint, 'page', this.currentPage);
        }
    }

    this.previuos = (endPoint) => {
        if (this.currentPage > 1) {
            this.currentPage--;
            RickMortyController.directEndPoint(endPoint, 'page', this.currentPage);
        }
    }

    this.seachTerm = (endPoint) => {
        RickMortyController.directEndPoint(endPoint, 'name', $('#input-search').val());
    }

    this.directEndPoint = (endPoint, parameter, value) => {
        if (endPoint == 'character') RickMortyController.getCharacters(parameter, value);
        else if (endPoint == 'location') RickMortyController.getLocations(parameter, value);
        else if (endPoint == 'episode') RickMortyController.getEpisodes(parameter, value);
    }

}

RickMortyController.instance = null;

RickMortyController.getInstance = () => {
    if (RickMortyController.instance == null)
        RickMortyController.instance = new RickMortyController();
    return RickMortyController.instance;
}

RickMortyController.getCharacters = (parameter, value) => {
    RickMortyController.getInstance().getCharacters(parameter, value);
}

RickMortyController.getLocations = (parameter, value) => {
    RickMortyController.getInstance().getLocations(parameter, value);
}

RickMortyController.getEpisodes = (parameter, value) => {
    RickMortyController.getInstance().getEpisodes(parameter, value);
}

RickMortyController.buildCharacters = (results) => {
    RickMortyController.getInstance().buildCharacters(results);
}
RickMortyController.buildLocations = (results) => {
    RickMortyController.getInstance().buildLocations(results);
}
RickMortyController.buildEpisodes = (results) => {
    RickMortyController.getInstance().buildEpisodes(results);
}
RickMortyController.next = (endPoint) => {
    RickMortyController.getInstance().next(endPoint);
}

RickMortyController.previuos = (endPoint) => {
    RickMortyController.getInstance().previuos(endPoint);
}

RickMortyController.seachTerm = (endPoint) => {
    RickMortyController.getInstance().seachTerm(endPoint);
}

RickMortyController.directEndPoint = (endPoint, parameter, value) => {
    RickMortyController.getInstance().directEndPoint(endPoint, parameter, value);
}