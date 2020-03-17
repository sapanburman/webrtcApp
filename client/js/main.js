var socket = io();

async function connect() {
  let  myUsername = document.getElementById("name").value;
    let peerConnection = new RTCPeerConnection({
        iceServers: [ // Information about ICE servers - Use your own!
            {
                urls: "stun:stun.l.google.com:19302", // A TURN server
            }
        ]
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("rtc", {
        "id":socket.id,
        "name":myUsername,
        "sdp": offer,
        
    });

     // We need to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.
};

socket.on('offer-video',(d)=>{
     // We need to set the remote description to the received SDP offer
  // so that our local WebRTC layer knows how to talk to the caller.
console.log(d)
  var desc = new RTCSessionDescription(d.sdp_offer);

  console.log(desc)
})