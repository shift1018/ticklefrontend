import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/person/avatar1.jpg" alt="" className="shareProfileImage" />
                     <input placeholder="What's in your mind?" className="shareInput" /> 
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMediaIcon htmlColor="#C12267" className="shareIcon"/>
                            <span className="shareOptionText"> Photo/Video </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="#FDD017" className="shareIcon"/>
                            <span className="shareOptionText"> Feeling/Activity </span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon htmlColor="#4CC417" className="shareIcon"/>
                            <span className="shareOptionText"> Location </span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
    
};
