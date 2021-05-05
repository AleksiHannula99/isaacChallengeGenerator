import React from 'react'

export default function Whotowhere({ charPic, bossPic }) {
    let chPic = "character/" + charPic;
    let bsPic = "bosses/" + bossPic;
    const imgURL = 'http://localhost/challengegenerator/'
    return (
        <div className="vspicture">
            <div className="leftup">
                <img className="charpic" src={imgURL + chPic} alt="character"/>
            </div>
            <div className="middlemiddle">
                <h1>TO</h1>
            </div>
            <div className="rightdown">
             <img className="bosspic" src={imgURL + bsPic} alt="boss"/>
            </div>
        </div>
    )
}
