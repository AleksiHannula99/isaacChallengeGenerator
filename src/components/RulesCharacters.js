import React, { useEffect, useState } from 'react'
import Loading from './Loading';

export default function RulesCharacters() {
    const [chars, setChars] = useState([]);
    const[editChar, setEditChar] = useState(null);
    const[editCharName, setEditCharName] = useState('');
    const[editCharInfo, setEditCharInfo] = useState('');
    const [rules, setRules] = useState([]);
    const[editRule, setEditRule] = useState(null);
    const[editRuleText, setEditRuleText] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    //Tätä käytetään listan päivitykseen
    const [submit, setSubmit] = useState(true);

    const URL = 'http://localhost/challengegenerator/';

    useEffect(() => {
        let status = 0;

        fetch(URL + "allCharacters.php")
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
     
            if(status === 200) {
                setChars(res);
                setIsLoaded(true);
           } else {
             alert(res.error);
           }
     
          }, (error) => {
           alert("An error has occurred, please try again later.");
          }
        )
    }, [submit])

    useEffect(() => {
        let status = 0;

        fetch(URL + "allRules.php")
        .then (res => {
         status = parseInt(res.status);
         return res.json();
        })
        .then(
          (res) => {
     
            if(status === 200) {
                setRules(res);
                setIsLoaded(true);
           } else {
             alert(res.error);
           }
     
          }, (error) => {
           alert("An error has occurred, please try again later.");
          }
        )
    }, [submit])

    function onRemove(ID, ruleOrCharacter) {
        let rOrC = ruleOrCharacter;
        let theID = ID;

        const formData = new FormData();
        formData.append('ID', theID);
        formData.append('ruleOrCharacter', rOrC);

        fetch(URL + 'remove.php',
            {
                method: 'POST',
                body: formData
            }
        )
            .then((res) => {
                setSubmit(!submit);
            }
            )
    }

    function updateChar(e) {
        e.preventDefault();
        let status = 0;
        fetch(URL + 'updateChar.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editChar.ch_id,
            name: editCharName,
            info: editCharInfo
          })
        })
        .then(res=> {
          status = parseInt(res.status);
          return res.json();
        })
        .then(
          (res) => {
            if (status === 200) {
              chars[(chars.findIndex(char=> char.ch_id === editChar.ch_id))].ch_name = editCharName;
              chars[(chars.findIndex(char=> char.ch_id === editChar.ch_id))].info = editCharInfo;
              setChars([...chars]); 
              setEditChar(null);
              setEditCharInfo('');
              setEditCharName('');
            } else {
              alert(res.error);
            }
          }, (error) => {
            alert(error);
          }
        )
      }

      function setEditedChar(char) {
        setEditChar(char);
        setEditCharName(char?.ch_name);
        setEditCharInfo(char?.info);
      }

      function updateRule(e) {
        e.preventDefault();
        let status = 0;
        fetch(URL + 'updateRule.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: editRule.extra_id,
            rule: editRuleText
          })
        })
        .then(res=> {
          status = parseInt(res.status);
          return res.json();
        })
        .then(
          (res) => {
            if (status === 200) {
              rules[(rules.findIndex(rules=> rules.extra_id === editRule.extra_id))].rule = editRuleText;
              setRules([...rules]); 
              setEditRule(null);
              setEditRuleText('');
            } else {
              alert(res.error);
            }
          }, (error) => {
            alert(error);
          }
        )
      }

      function setEditedRule(rules) {
        setEditRule(rules);
        setEditRuleText(rules?.rule);
      }

    if (!isLoaded) {
        return <Loading />
     }
     else {
    return (
        <div className="contentBackground">
            <h1>Characters</h1>

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Info</th>
                </tr>
                </thead>

                <tbody>
                {chars.map(char => (
                <tr key={char.ch_id}>
                    <td>
                    {editChar?.ch_id !== char.ch_id &&
                    char.ch_name
                    }
                    {editChar?.ch_id === char.ch_id &&
                    <input value={editCharName} onChange={e => setEditCharName(e.target.value)} />
                    }
                    </td>

                    <td>
                    {editChar?.ch_id !== char.ch_id &&
                    char.info
                    }

                    {editChar?.ch_id === char.ch_id && 
                    <form onSubmit={updateChar}>
                    <input type="text" size="50" value={editCharInfo} onChange={e => setEditCharInfo(e.target.value)}/>
                    <button className="btn btn-primary mx-2">Save</button>
                    <button className="btn btn-primary mx-2" type="button" onClick={() => setEditedChar(null)}>Cancel</button>
                    </form>
                    }
                    <br/>
                    <button id="btnDelete" className="btn btn-danger"
                     onClick={() => { if (window.confirm('Are you sure you want to delete this character from appearing:' + char.ch_name + '?')) onRemove(char.ch_id, 0) } }
                     >Delete
                     </button>

                     {editChar === null && 
                     <button id="btnEdit" className="btn btn-primary" onClick={() => setEditedChar(char)}>
                     Edit
                     </button>
                    }
                    
                     </td>
                </tr>
                ))}
                </tbody>
            </table>

            <h1>Rules</h1>

            <table className="text-center largetext">
                <thead>
                <tr>
                    <th>Rule</th>
                </tr>
                </thead>
                <tbody>
                {rules.map(rules => (
                <tr key={rules.extra_id}>
                    <td>
                    {editRule?.extra_id !== rules.extra_id &&
                    rules.rule
                    }
                    {editRule?.extra_id === rules.extra_id &&
                    <form onSubmit={updateRule}>
                    <input value={editRuleText} onChange={e => setEditRuleText(e.target.value)} />
                    <button className="btn btn-primary mx-2">Save</button>
                    <button className="btn btn-primary mx-2" type="button" onClick={() => setEditedRule(null)}>Cancel</button>
                    </form>
                    }
                
                    <button id="btnDelete" className="btn btn-danger ml-2"
                     onClick={() => { if (window.confirm('Are you sure you want to delete this rule?')) onRemove(rules.extra_id, 1) } }
                     >Delete
                     </button>

                     {editRule === null && 
                     <button id="btnEdit" className="btn btn-primary" onClick={() => setEditedRule(rules)}>
                     Edit
                     </button>
                    }
                     </td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
}
