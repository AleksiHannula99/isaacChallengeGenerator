import { React, useState, useEffect } from 'react';
import Loading from '../Loading';

export default function Extrarule() {
    const[rule, setRule] = useState('');
    const URL = 'http://localhost/challengegenerator/randomOptionals/';
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let status = 0;

        fetch(URL + "randRule.php")
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
            if(status === 200) {
                setRule(res);
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
            {rule.map(rule => (
            <div key={rule.rule} className="optional-adds p-1">
            <h2>Extra rule</h2>
            <p className="rule">{rule.rule}</p>
            </div>
            ))}
        </div>
    )
}
}