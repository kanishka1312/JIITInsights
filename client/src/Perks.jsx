export default function Perks({selected, onChange}) {
    function handleCbClick(ev) {
        const {checked, name} = ev.target;
        if(checked){
            onChange([...selected, name]);
        }
        else{
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('networking')} name="networking" onChange={handleCbClick}/>
                <span>networking</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('skill')} name="skill" onChange={handleCbClick}/>
                <span>skill</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('alumni')} name="alumni" onChange={handleCbClick}/>
                <span>alumni</span>
            </label>
        </>
    );
}