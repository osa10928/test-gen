import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule,
  MatSelectModule, MatSidenavModule,
  MatSlideToggleModule, MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule,
}                                         from '@angular/material';

export const materialModule = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule,
  MatSelectModule, MatSidenavModule,
  MatSlideToggleModule, MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatGridListModule,
  MatTooltipModule,
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModule
  ],
  exports: [
    ...materialModule
  ]
})
export class MaterialModule { }
