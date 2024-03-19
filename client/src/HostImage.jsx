
export default function HostImage({host, index=0, className=null}) {
    if(!host.photos?.length) {
        return '';
    }
    if(!className){
        className = 'object-cover';
    }
    return(
        <img className={className} src={'http://localhost:4000/uploads/'+host.photos[index]} alt="" />
    );
}