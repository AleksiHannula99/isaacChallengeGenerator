import { React, useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap'
import Loading from '../Loading';

export default function Everyitemis() {
    const[everyItem, setEveryItem] = useState('');
    const URL = 'http://localhost/challengegenerator/randomOptionals/';
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let status = 0;

        fetch(URL + "randItem.php")
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
            if(status === 200) {
                setEveryItem(res);
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
             {everyItem.map(item => (
            <div key={item.item} className="optional-adds p-1">
            <h2>EVERY ITEM IS</h2>
            <Badge variant="danger" className="badgething">
                {item.item}
            </Badge>
            </div>
             ))}
        </div>

    )
}
}
