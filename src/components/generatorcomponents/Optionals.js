import { React, useState } from 'react';

export default function Optionals(props) {
    const[everyitem, setEveryitem] = useState(true);
    const[extrarules, setExtrarules] = useState(true);

    //Nämä booleanit lähetetään Content.js parent komponenttiin, josta ne lähetetään main generator komponenttiin
    const[booleanRule, setBooleanRule] = useState(true);
    const[booleanItems, setBooleanItems] = useState(true);
    const[booleanEvery, setBooleanEvery] = useState(true);
    const[booleanTainted, setBooleanTainted] = useState(true);

    const[rule, setRule] = useState('');

    //Tätä käytetään listan päivitykseen
    const [submit, setSubmit] = useState(true);
    
    //Kertoo tallennuksesta 
    const[saved, setSaved] = useState('');

    const URL = 'http://localhost/challengegenerator/';

    function toggleClass(classToShow) {
        if (classToShow === "everyitem") {
            setEveryitem(!everyitem);
        } else if (classToShow === "extrarules") {
            setExtrarules(!extrarules);
        }
        setSaved('');
    }

    function addRule(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('rule',rule);

        fetch (URL + 'addRule.php',
            {
            method: 'POST',
            body: formData 
            }
        )
        .then((res) => {
            setRule('');
            setSubmit(!submit);
            setSaved('Saved to database!');
        })
        
    }

    return (
        <div className="row">
        <div className="col-12">
            <section className="optionals-box p-3 pl-5">
            <h4>Optionals</h4>

            <div className="checkbox check-transparent">
                <input type="checkbox" id="extrarules" onChange={() => props.showBlocks(!booleanRule) } onClick={() => setBooleanRule(!booleanRule)}/>
                <label htmlFor="extrarules"> Extra rules
                <button type="button" className="btn btn-secondary py-0 px-1 mx-1" onClick={() => toggleClass("extrarules")}>{extrarules ? "Add new" : "Hide"}</button>
            </label>
            </div>

            <div className="checkbox check-transparent">
                <input type="checkbox" id="everyitem" onChange={() => props.showBlocks2(!booleanEvery) } onClick={() => setBooleanEvery(!booleanEvery)}/>
                <label htmlFor="everyitem"> "Every item is..." 
            </label>
            </div>

            <div className="checkbox check-transparent">
                <input type="checkbox" id="tainteds" onChange={() => props.showBlocks3(!booleanTainted) } onClick={() => setBooleanTainted(!booleanTainted)}/>
                <label htmlFor="tainteds"> Tainted Characters
            </label>
            </div>

            <div className="checkbox check-transparent">
                <input type="checkbox" id="itemcombo" onChange={() => props.showBlocks4(!booleanItems) } onClick={() => setBooleanItems(!booleanItems)}/>
                <label htmlFor="itemcombo"> Item Combo
            </label>
            </div>
            </section>
        </div>
        
        <div className={"col-md-7" + `div ${everyitem ? "hidden" : ""}`}>
            
        </div>
        <div className={"col-md-6 text-end p-2 ml-2 pt-3" + `div ${extrarules ? "hidden" : ""}`}>
             <form onSubmit={addRule} className="pt-4">
                <h3>New rule</h3>
                <input type="text" maxLength="255" value={rule} onChange={e => setRule(e.target.value)} style={{width: '80%'}} />
                <br/>
                <button className="btn btn-primary mt-2">Add new</button>
                <p className="text-muted">{saved}</p>
            </form>
        </div>
        </div>
    )
}
