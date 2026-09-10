import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationData, ConversationTurn } from '../../models/lesson.data';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation.html',
  styleUrls: ['./conversation.scss']
})
export class ConversationComponent implements OnInit {
  @Input() data!: ConversationData;
  
  recordingTurnId: string | null = null;
  recordingScore: number | null = null;
  isRecording: boolean = false;
  
  ngOnInit() {
  }

  playAudio(turn: ConversationTurn) {
    // Tạm thời mock play audio
    console.log('Playing audio for:', turn.pinyin);
  }

  startRecording(turn: ConversationTurn) {
    this.recordingTurnId = turn.id;
    this.isRecording = true;
    this.recordingScore = null;
    
    // Tạm thời mock giả lập ghi âm 2 giây sau đó trả về điểm ngẫu nhiên
    setTimeout(() => {
      this.isRecording = false;
      this.recordingScore = Math.floor(Math.random() * 20) + 80; // 80-100 score
    }, 2000);
  }
}
