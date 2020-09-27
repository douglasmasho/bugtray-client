import React from 'react';

const ChangeStatus = (props) => {
    const {routeArgs} = props;
    const name = routeArgs.match.params.name;
    return ( 
        <div className="screen center-hrz--col">
            <div className="center-hrz">
            <h1 className="screen__header u-margin-bottom-big white-text">Change Status - {name}</h1>
            </div>
            <div className="radio-field u-margin-bottom">
                <form>
                    <input type="radio" name="status" id="new" className="radio"/>
                     <label htmlFor="new" className="radio-label" tabIndex="2" >New</label>
                     <input type="radio" name="status" id="under-review" className="radio"/>
                     <label htmlFor="under-review" className="radio-label" tabIndex="2" >Under review</label>
                     <input type="radio" name="status" id="fixed" className="radio"/>
                     <label htmlFor="fixed" className="radio-label" tabIndex="2" >Fixed</label>
                </form>

            </div>
        </div>
     );
}
 
export default ChangeStatus;