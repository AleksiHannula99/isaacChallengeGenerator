import { useState, React } from 'react'
import MainGenerator from './generatorcomponents/MainGenerator'
import Optionals from './generatorcomponents/Optionals'

export default function Content() {
    //Nämä viedään Main generator komponenttiin, ja ne kertovat tiedon, näytetäänkö tiettyjä komponentteja
    const [ruleShow, setRuleShow] = useState(true);
    const [itemsShow, setItemsShow] = useState(true);
    const [everyShow, setEveryShow] = useState(true);
    const[tainted, setTainted] = useState(true);

    return (
        <div>

            <Optionals
            showBlocks={ruleShow => setRuleShow(ruleShow)}
            showBlocks2={everyShow => setEveryShow(everyShow)}
            showBlocks3={tainted => setTainted(tainted)}
            showBlocks4={itemsShow => setItemsShow(itemsShow)}
            />
            
            <MainGenerator rule={ruleShow} items={itemsShow} every={everyShow} tainted={tainted}/>

        </div>
    )
}
