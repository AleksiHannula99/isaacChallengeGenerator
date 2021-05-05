import React from 'react'

export default function Footer() {
    return (
        <footer className="row footerstyle">
            <div className="col-md-6 text-center footerblock">
                <p>Tämä footer on nyt tässä pieneksi selitykseksi, jos peli "Binding of Isaac" ei ole tuttu.
                    Pelin communityssä on iso juttu tehdä haasteita tai "Challengeja", koska Isaac on Rogue-like, jossa on satoja eri
                    itemeitä, joilla on eri vaikutuksia pelin kulkuun. Pelissä on useita loppuja ja reittejä, jotka tämä haaste generaattori arpoo
                    pelaajalle. Pelissä on myös useita hahmoja, joista uusin lisäys on täysin gameplayta muuttavat "Tainted" hahmot.
                    Nämä hahmot ovat hankalia, joten tein vaihtoehdon ottaa niiden ilmestymisen pois päältä.
                </p>
                <p>Sivustosta tuli monimutkaisempi, kuin ajattelin, joten vieressä on myös perustoimivuuksia listattuna. Niin vaan käy,
                    kun ensimmäistä kertaa saa ihan vapaat kädet oman projektin tekemiseen. Kiitos kurssista ja mielenkiintoisista tehtävistä.
                    Hyvää kesää!
                </p>
            </div>
            <div className="col-md-6 footerblock">
                <h3>Miten sivusto toimii:</h3>
                <ul>
                    <li> Sääntöjä ja hahmoja voi poistaa ja muokata kohdasta "Rules and Characters".</li>
                    <li>Sääntöjä ja hahmoja voi lisätä home sivulla painikkeista "Add new" ja "Add modded character" Hahmon lisääminen asettaa hahmon kuvaksi
                        placeholder kuvan.
                    </li>
                    <li>Ylimääräisen haaste säännön saa esille valitsemalla "Extra rules" optionals valikosta. Kaikki muut checkboxit tekevät samanlaisen lisäyksen
                        paitsi "Tainted Characters"
                    </li>
                    <li>Klikkaamalla "Generate a new challenge", päivittyy haasteen generoiva taulu uusilla tuloksilla.</li>
                </ul>
            </div>
            <div className="col-12 copyright_footer">
                <p>Aleksi Hannula</p>
            </div>
        </footer>
    )
}
