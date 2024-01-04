// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { Utils } from "../utils/Utils"
import { DateTimeUtils } from "../utils/DateTimeUtils"

export const PayslipPrint = {
    payslip: (params, dateRange, tempData, grossData, RDData, TKData, zeroValue) => `
        <html lang="en">
            <head>
                <style>
                    body {
                        font-family: Tahoma, Geneva, sans-serif;
                        padding: 50px;
                        page-break-inside: avoid ! important;
                    }

                    #headerTitle {
                        text-align: center;
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .rowView {
                        line-height: 3px;
                        page-break-inside: avoid ! important;
                        page-break-before: avoid !important;
                        page-break-after: avoid !important;
                    }

                    .rowRightView {
                        margin-top: -10px;
                        display: flex;
                        justify-content: flex-end;
                    }

                    .rowIndentView {
                        margin-left: 60px;
                    }

                    .hr {
                        height: 0px;
                        border: none;
                        border-top: 1px solid black;
                    }

                    .hrThick {
                        height: 0px;
                        margin-top: -5px;
                        border: none;
                        border-top: 2px solid black;
                    }

                    #rowText {
                        page-break-before: avoid !important; 
                        page-break-inside: avoid !important; 
                        page-break-after: avoid !important;
                    }

                    #boldText {
                        font-size: 15px;
                        font-weight: bolder;
                        margin-right: 10px;
                        
                        page-break-before: auto;
                        display: inline-block;
                        page-break-after: auto;
                    }

                    #regularText {
                        font-size: 15px;
                        page-break-before: auto;
                        display: inline-block;
                        page-break-after: auto;
                    }

                    #rowSpaceText {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        line-height: 5px;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h3 id="headerTitle">MAGELLAN PERFORMANCE OUTSOURCING CORP.</h3>

                    <div class="rowView" style="margin-top: 50px;">
                        <p id="rowText">
                            <span id="boldText">Document No: </span>
                            <span id="regularText">${params.DocumentNo}</span>
                        </p>
                    </div>

                    <div class="rowView">
                        <p id="rowText">
                            <span id="boldText">Employee Name: </span>
                            <span id="regularText">${tempData.Name_Employee}</span>
                        </p>
                    </div>

                    <div class="rowView">
                        <p id="rowText">
                            <span id="boldText">Employee Code: </span>
                            <span id="regularText">${tempData.Code_Employee}</span>
                        </p>
                    </div> <hr class="hr" />

                    <div class="rowView">
                        <p id="rowText">
                            <span id="boldText">Pay Out Date: </span>
                            <span id="regularText">${DateTimeUtils.dateFullConvert(tempData.DatePayoutSchedule)}</span>
                        </p>
                    </div>

                    <div class="rowView">
                        <p id="rowText">
                            <span id="boldText">Cut Off Period: </span>
                            <span id="regularText">${dateRange}</span>
                        </p>
                    </div> <hr class="hr" />

                    <p id="boldText">Gross Pay</p>
                    <hr class="hrThick" /> <hr class="hrThick" />

                    <div class="rowView">
                        <p id="rowSpaceText">
                            <span id="boldText">Regular Day: </span>
                            <span id="regularText">${Utils.amountFormat(RDData[0].TotalHours) + ' hrs'}</span>
                            <span id="regularText">${Utils.amountFormat(RDData[0].TotalAmount)}</span>
                        </p>
                    </div>

                    ${ grossData?.map((item, index) => `
                        <div class="rowView">
                            <p id="rowSpaceText">
                                <span id="boldText">${item.Name_PayrollItem}</span>
                                <span id="regularText">${Utils.amountFormat(item?.TotalAmount)}</span>
                            </p>
                        </div> 
                    `).join('') }
                    
                    <hr class="hr" />

                    <div class="rowRightView">
                        <p id="rowText">
                            <span id="boldText">Total Gross Pay: </span>
                            <span id="regularText">${Utils.amountFormat(params?.GrossPay)}</span>
                        </p>
                    </div>

                    <p id="boldText">Deductions</p>
                    <hr class="hrThick" /> <hr class="hrThick" />

                    ${zeroValue(params?.SSSES) ? 
                        `<div class="rowView">
                            <p id="rowSpaceText">
                                <span id="boldText">SSS Employee Share: </span>
                                <span id="regularText">${Utils.amountFormat(params?.SSSShare)}</span>
                            </p>
                        </div>`
                        : ''
                    }

                    ${zeroValue(params?.PHICEE) ? 
                        `<div class="rowView">
                            <p id="rowSpaceText">
                                <span id="boldText">PhilHealth Employee Share: </span>
                                <span id="regularText">${Utils.amountFormat(params?.PHICEE)}</span>
                            </p>
                        </div>`
                        : ''
                    }

                    ${zeroValue(params?.HDMFEE) ? 
                        `<div class="rowView">
                            <p id="rowSpaceText">
                                <span id="boldText">HDMF Employee Share: </span>
                                <span id="regularText">${Utils.amountFormat(params?.HDMFEE)}</span>
                            </p>
                        </div> `
                        : ''
                    }

                    ${zeroValue(params?.Tax) ? 
                        `<div class="rowView">
                            <p id="rowSpaceText">
                                <span id="boldText">Withholding Tax: </span>
                                <span id="regularText">${Utils.amountFormat(params?.Tax)}</span>
                            </p>
                        </div>`
                        : ''
                    }

                    <hr class="hr" />

                    <div class="rowRightView">
                        <p id="rowText">
                            <span id="boldText">Total Deductions: </span>
                            <span id="regularText">${Utils.amountFormat(params?.Deductions)}</span>
                        </p>
                    </div>

                    <p id="boldText">Net Pay</p>
                    <hr class="hrThick" /> <hr class="hrThick" />

                    <div class="rowRightView">
                        <p id="rowText">
                            <span id="boldText">PHP </span>
                            <span id="boldText">${Utils.amountFormat(params?.NetPay)}</span>
                        </p>
                    </div> <hr class="hr" />

                    <!-- Timekeeping -->
                    <div style="page-break-before: always; padding-top: 3em !important">
                        <h4 id="headerTitle">TIMEKEEPING</h4>

                        <div class="rowView" style="margin-top: 40px;">
                            <p id="rowText">
                                <span id="boldText">Cut-off Period: </span>
                                <span id="regularText">${dateRange}</span>
                            </p>
                        </div>
                
                        <hr class="hrThick" /> <hr class="hrThick" />
                    </div> 

                        ${TKData?.map((item, index) => `
                            <div class="rowView">
                                <p id="boldText" style="margin-top: 20px; margin-bottom: 20px; font-size: 15px; ">${DateTimeUtils.dateFullConvert(item.WorkDate)}</p>

                                <div class="rowIndentView">     
                                    <p id="rowText">
                                        <span id="boldText">Day Type:</span>
                                        <span id="regularText">${item.DayType}</span>
                                    </p>

                                    ${item.DayType === 'RG' || (item.DayType && item.DayType.includes('LH')) ? (
                                        `<p id="rowText">
                                            <span id="boldText">Schedule: </span>
                                            <span id="regularText">${item.Name_Schedule}</span>
                                        </p>
                                    
                                        <p id="rowText">
                                            <span id="boldText">Time-in: </span>
                                            <span id="regularText">${DateTimeUtils.timeConvert(item.ActualTimeIn)}</span>
                                        </p>
                                        <p id="rowText">
                                            <span id="boldText">Time-out: </span>
                                            <span id="regularText">${DateTimeUtils.timeConvert(item.ActualTimeOut)}</span>
                                        </p>`
                                    
                                        + ((item.REG !== '' && item.REG !== 0) ?
                                            `<p id="rowText" style="margin-top: 40px;">
                                                <span id="boldText">Regular Hours: </span>
                                                <span id="regularText">${item.REG}</span>
                                            </p>`
                                            : ''
                                        )
                                    
                                        + ((item.Leave !== '' && item.Leave !== null && item.Leave !== 0) ?
                                            `<p id="rowText">
                                                <span id="boldText">Leave: </span>
                                                <span id="regularText">${item.Leave}</span>
                                            </p>`
                                            : ''
                                        )
                                        
                                        + ((item.OT !== '' && item.OT != null && item.OT !== 0) ?
                                            `<p id="rowText">
                                                <span id="boldText">Overtime: </span>
                                                <span id="regularText">${item.OT}</span>
                                            </p>`
                                            : ''
                                        )
                                    
                                        + ((item.Tardy !== '' && item.Tardy != null && item.Tardy !== 0) ?
                                            `<p id="rowText">
                                                <span id="boldText">Tardy: </span>
                                                <span id="regularText">${item.Tardy}</span>
                                            </p>`
                                            : ''
                                        )
                                    
                                    ) : '' }                                    
                                </div> <hr class="hr" />
                            </div>
                        `).join('')}

                        ${TKData?.length <= 0 ? `<h5 id="headerTitle">No Timekeeping Records.</h5>` : ''}
                </div>
            </body>
        </html>
    `,
}