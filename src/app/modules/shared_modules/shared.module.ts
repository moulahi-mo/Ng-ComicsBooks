import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/components/shared/error/error.component';
import { LoadingComponent } from 'src/app/components/shared/loading/loading.component';
import { NoDataComponent } from 'src/app/components/shared/no-data/no-data.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ErrorComponent, LoadingComponent, NoDataComponent],
  imports: [CommonModule, FormsModule],
  exports: [ErrorComponent, LoadingComponent, NoDataComponent],
})
export class SharedModule {}
