import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IconVectorDown } from 'src/components/icons'
import s from './SelectCommon.module.scss'
import SelectOption from './SelectOption/SelectOption'

interface Props {
    selected?:string|null,
    initValue?:string|null,
    placeholder? : string,
    value?: string,
    size?: 'base' | 'large',
    type?: 'default' | 'custom',
    options: {name: string, value: string}[],
    onChange?: (value: string) => void,
}

const SelectCommon = ({selected,initValue, type = 'default', size = 'base', options, placeholder, onChange}: Props) => {
    const [selectedName, setSelectedName] = useState(placeholder)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(()=>{
        const nameSelect = options.find((val)=>val.value === selected);
        setSelectedName(nameSelect?.name ?? 'State');
        setSelectedValue(initValue ?? '');
        onChange && onChange(initValue ?? '');
    },[])

    const changeSelectedName = (value: string) => {
        setSelectedValue(value)
        const name = options.find(item => item.value === value)?.name
        setSelectedName(name)
        onChange && onChange(value)
    }
    return(
        <>
            <div className={classNames({
                [s.select] : true,
                [s[size]] : !!size,
                [s[type]] : !!type,
            })}
            >
                <div className={classNames({
                    [s.selectTrigger] : true,
                    
                })}
                >{selectedName || placeholder}<IconVectorDown /></div>
                
                <div className={s.hoverWrapper}>
                    <div className={classNames({
                        [s.selectOptionWrapper] : true,
                        [s[type]] : !!type,
                        [s[size]] : !!size,
                    })}
                    >   
                        {
                            options.map(item => 
                                <SelectOption key={item.value}
                                    itemName={item.name}
                                    value={item.value}
                                    onChange={changeSelectedName}
                                    size={size} selected={(selectedValue === item.value)} />
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectCommon