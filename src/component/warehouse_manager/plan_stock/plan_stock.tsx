import React from 'react';

const PlanStock = () => {
    return (
        <div>
            <div>
                <h5>Утверждение склада</h5>
                Выберите склад:
                <select className="browser-default" style={{
                    backgroundColor: "rgb(255 255 255 / 0%)",
                    border: '1px solid #f2f2f200',

                }}>
                    <option value="" disabled selected>Выбрать план склада</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
                Определите статус:
            </div>
        </div>
    );
};

export default PlanStock;