import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoteToStarsPipe } from '../pipes/note-to-stars.pipe';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [NoteToStarsPipe, NavbarComponent],
  imports: [CommonModule, HttpClientModule, MatTabsModule, RouterModule],
  exports: [CommonModule, HttpClientModule, RouterModule, NavbarComponent, NoteToStarsPipe, MatTabsModule],
})
export class SharedModule {}
