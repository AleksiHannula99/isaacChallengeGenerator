import { React, useState, useEffect } from 'react';
import { Card, Col, Form, Button } from 'react-bootstrap';
import Loading from '../Loading';
import Everyitemis from './Everyitemis';
import Extrarule from './Extrarule';
import Itemcombo from './Itemcombo';
import Whotowhere from './Whotowhere';


export default function MainGenerator({ rule, items, every, tainted }) {

    //Nämä haetaan contentista ja ne kertovat, näytetäänkö alakomponentteja vai ei
    let extrarules = rule;
    let itemscombo = items;
    let everyitems = every;
    let taintedChars = tainted;
    
    const [isLoaded, setIsLoaded] = useState(false);
    const[generation, setGeneration] = useState([]);
    const [newCharacter, setNewCharacter] = useState(true);
    const [characterName, setCharacterName] = useState('');
    const [characterInfo, setCharacterInfo] = useState('');
    const[submit, setSubmit] = useState(false);

    const URL = 'http://localhost/challengegenerator/';

     //Kertoo tallennuksesta 
     const[saved, setSaved] = useState('');

     useEffect(() => {
        let status = 0;

        generate();

        fetch(URL + 'generation.php')
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
            if(status === 200) {
                setGeneration(res);
           } else {
             alert(res.error);
           }
     
          }, (error) => {
           alert("An error has occurred, please try again later.");
          }
        )
    }, [submit])

    function generate() {
        setIsLoaded(false);
        let status = 0;

        const formData = new FormData();
        formData.append('tainted', taintedChars);
        
        fetch(URL + "createGeneration.php",
        {
            method: 'POST',
            body: formData
        })
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
     
            if(status === 200) {
                setIsLoaded(true);
           } else {
             alert(res.error);
           }
     
          }, (error) => {
           alert("An error has occurred, please try again later.");
          }
        )

    }


    function toggleClass(classToShow) {
        if (classToShow === "newCharacterForm") {
            setNewCharacter(!newCharacter);
        } 
        setSaved('');
    }

    function addCharacter(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('chName',characterName);
        formData.append('chInfo', characterInfo);

        fetch (URL + 'addCharacter.php',
            {
            method: 'POST',
            body: formData 
            }
        )
        .then((res) => {
            setCharacterName('');
            setCharacterInfo('');
            setSaved('Saved to database!');
        })
    }

    function refreshGeneration() {
        setSubmit(!submit);
        setIsLoaded(false);
    }

    if (!isLoaded) {
        return <Loading />
     }
     else {

    return (
        <>
        <div className="row">
        <div className="col-xl-6 generateTable">
            <table className="generatorblock text-center">
                <thead>
                <tr>
                    <th>Rule</th>
                    <th>Result</th>
                </tr>
                </thead>
                {generation.map(generation => (
                <tbody key={generation.ch_name}>
                <tr>
                    <td>Devil/Angel</td>
                    <td>{generation.deal}</td>
                </tr>
                <tr>
                    <td>To where?</td>
                    <td>{generation.boss}</td>
                </tr>
                <tr>
                    <td>Shops</td>
                    <td>{generation.allowed}</td>
                </tr>
                <tr>
                    <td>Character</td>
                    <td>{generation.ch_name}
                        <br/>
                        <button className="btn btn-secondary ml-2" onClick={() => toggleClass("newCharacterForm")}>{newCharacter ? "Add modded character" : "Hide"}</button>
                    </td>
                </tr>
                </tbody>
                ))}
            </table>
        </div>
        <div className="col-xl-6 mt-1">
        {generation.map(generation => (
            <Card key={generation.info} className="generatorblock">
                <Card.Title className="charactername">{generation.ch_name}</Card.Title>
                <Card.Body>
                <Whotowhere charPic={generation.ch_pic} bossPic={generation.boss_pic}/>
                </Card.Body>
                <Card.Footer>
                <p className="text-muted char_info text-center">{generation.info}</p>
                </Card.Footer>
            </Card>
        ))}
        </div>

        <div className="col-12 my-3">
        <Button variant="dark" onClick={refreshGeneration}>Generate a new challenge!</Button>
        </div>

        <div className={"col-7 my-3 pt-3" + `div ${newCharacter ? "hidden" : ""}`}>
        <Form className="optional-form px-2">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Character name</Form.Label>
                <Form.Control placeholder="Name" value={characterName} onChange={e => setCharacterName(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Character info</Form.Label>
                <Form.Control placeholder="Info" value={characterInfo} onChange={e => setCharacterInfo(e.target.value)} />
                </Form.Group>
            </Form.Row>

            <Button variant="primary" onClick={addCharacter}>
                Submit
            </Button>
        </Form>
            <p className="text-muted">{saved}</p>
        </div>

        </div>
        <div className={'row pt-3' + `div ${everyitems ? "hidden" : ""}`}>
        <Everyitemis />
        </div>
        <div className={'row pt-3' + `div ${itemscombo ? "hidden" : ""}`}>
        <Itemcombo />
        </div>
        <div className={'row pt-3' + `div ${extrarules ? "hidden" : ""}`}>
        <Extrarule />
        </div>
        </>
    )
}
}
