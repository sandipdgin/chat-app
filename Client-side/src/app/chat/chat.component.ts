import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  title = 'Websocket Angular client ';
  userName = '';
  message: string;
  output: any[] = [];
  feedback: string;
  userDetails: any;

  messageForm = new FormGroup({
    userMessage: new FormControl(''),
  });

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService
      .listen('typing')
      .subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data) => {
      console.log('data >', data);
      this.updateMessage(data);
    });
    this.setUserName();
  }

  setUserName(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userdetails'));
    // console.log('chat component', this.userDetails);
    if (this.userDetails) {
      this.userName = this.userDetails.fName;
    }
  }

  messageTyping(): void {
    this.webSocketService.emit('typing', this.userName);
  }

  sendMessage(): void {
    this.message = this.messageForm.get('userMessage').value;
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.userName,
    });
    this.message = '';
  }

  updateMessage(data: any) {
    this.feedback = '';
    if (!!!data) {
      return;
    }
    console.log(`${data.handle} : ${data.message}`);
    this.output.push(data);
  }

  updateFeedback(data: any) {
    this.feedback = `${data} is typing a message`;
  }
}
