import { React, useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap'
import Loading from '../Loading';

export default function Itemcombo() {
    const[itemCombo, setItemCombo] = useState('');
    const URL = 'http://localhost/challengegenerator/randomOptionals/';
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let status = 0;

        fetch(URL + "randItemCombo.php")
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
            if(status === 200) {
                setItemCombo(res);
                setIsLoaded(true);
           } else {
             alert(res.error);
           }
     
          }, (error) => {
           alert("An error has occurred, please try again later.");
          }
        )
    }, [])

    if (!isLoaded) {
        return <Loading />
     }
     else {
    return (
        <div className="col-12 mt-2">
            <div className="optional-adds p-1">
            <h2>ITEM COMBO</h2>
            {itemCombo.map(item => (
            <Badge variant="danger" className="badgething border border-dark">
                {item.item}
            </Badge>
            ))}
            
            </div>
        </div>

    )
}
}
