import React from 'react';

import s from './checkbox.module.scss';

export default function Checkbox() {
    return (


        <div className={s.gridcontainer}>

            <div className={s.box}>

                <div className={s.item}>
                    <div className={s.checkboxcircle2}>
                        <input type="checkbox" id="checkbox-circle2" name="check" />
                            <label htmlFor="checkbox-circle2"></label>
                    </div>
                </div>

            </div>

{/*             <div className={s.box}>

                <div className={s.item}>
                    <div className={s.togglerectdark}>
                        <input type="checkbox" id="rect4" name="check" />
                            <label htmlFor="rect4"></label>
                    </div>
                </div>

            </div> */}

{/*             <div className={s.box}>

                <div className={s.item}>
                    <div className={s.togglepilldark}>
                        <input type="checkbox" id="pill4" name="check" />
                            <label htmlFor="pill4"></label>
                    </div>
                </div>

            </div> */}
        </div>


    )
}