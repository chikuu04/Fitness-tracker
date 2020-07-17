import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
  }

  // tslint:disable-next-line: typedef
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
