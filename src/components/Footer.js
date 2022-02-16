import React from 'react'

export default function Footer() {
    return (
        <footer className="row footerstyle mx-0">
            <div className="col-md-6 text-center footerblock">
                <p>This challenge generator is meant for the game Binding of Isaac (specifically, the Repentance DLC). 
                </p>
            </div>
            <div className="col-md-6 footerblock text-center">
            <p> Add, edit or delete characters and rules you don't want to see in the Rules and Characters section</p>

            </div>
            <div className="col-12 copyright_footer">
                <p>Aleksi Hannula, 2021</p>
            </div>
        </footer>
    )
}
