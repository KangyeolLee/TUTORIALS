import Component from '@/Core/Component';
import './styles';
import { html } from '@/utils/helper';

export default class Calendar extends Component {
  template() {
    return html`
      <table class="calendar-table">
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>1</td>
            <td>
              <div class="history">
                <div class="income">${'1,450,000'}</div>
                <div class="outcome">${'-50,000'}</div>
                <div class="amount">${'1,400,000'}</div>
              </div>
              <div class="day">2</div>
            </td>
            <td>3</td>
          </tr>

          <tr>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
          </tr>

          <tr>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
          </tr>

          <tr>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
          </tr>

          <tr>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td class="${'today'}">28</td>
            <td>29</td>
            <td>30</td>
            <td>31</td>
          </tr>
        </tbody>

        <tbody></tbody>
      </table>
    `;
  }
}
