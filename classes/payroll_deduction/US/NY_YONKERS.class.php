<?php
/*********************************************************************************
 * TimeTrex is a Workforce Management program developed by
 * TimeTrex Software Inc. Copyright (C) 2003 - 2016 TimeTrex Software Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by
 * the Free Software Foundation with the addition of the following permission
 * added to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED
 * WORK IN WHICH THE COPYRIGHT IS OWNED BY TIMETREX, TIMETREX DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact TimeTrex headquarters at Unit 22 - 2475 Dobbin Rd. Suite
 * #292 West Kelowna, BC V4T 2E9, Canada or at email address info@timetrex.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Powered by TimeTrex" logo. If the display of the logo is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Powered by TimeTrex".
 ********************************************************************************/


/**
 * @package PayrollDeduction\US
 */
class PayrollDeduction_US_NY_YONKERS extends PayrollDeduction_US_NY {
/*
 														10 => 'Single',
														20 => 'Married',

Used to be:
														10 => 'Single',
														20 => 'Married - Spouse Works',
														30 => 'Married - Spouse does not Work',
														40 => 'Head of Household',
*/

	var $district_income_tax_rate_options = array(
												20150101 => array(
															10 => array(
																	array( 'income' => 8400,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11600,	'rate' => 4.5,	'constant' => 336 ),
																	array( 'income' => 13750,	'rate' => 5.25,	'constant' => 480 ),
																	array( 'income' => 21150,	'rate' => 5.90,	'constant' => 593 ),
																	array( 'income' => 79600,	'rate' => 6.45,	'constant' => 1029 ),
																	array( 'income' => 95550,	'rate' => 6.65,	'constant' => 4800 ),
																	array( 'income' => 106200,	'rate' => 7.58,	'constant' => 5860 ),
																	array( 'income' => 159350,	'rate' => 8.08,	'constant' => 6667 ),
																	array( 'income' => 212500,	'rate' => 7.15,	'constant' => 10962 ),
																	array( 'income' => 265600,	'rate' => 8.15,	'constant' => 14762 ),
																	array( 'income' => 1062650,	'rate' => 7.35,	'constant' => 19090 ),
																	array( 'income' => 1115850,	'rate' => 9.62,	'constant' => 103752 ),
																	array( 'income' => 1115850,	'rate' => 49.02,	'constant' => 77673 ),
																	),
															20 => array(
																	array( 'income' => 8400,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11600,	'rate' => 4.5,	'constant' => 336 ),
																	array( 'income' => 13750,	'rate' => 5.25,	'constant' => 480 ),
																	array( 'income' => 21150,	'rate' => 5.90,	'constant' => 593 ),
																	array( 'income' => 79600,	'rate' => 6.45,	'constant' => 1029 ),
																	array( 'income' => 95550,	'rate' => 6.65,	'constant' => 4800 ),
																	array( 'income' => 106200,	'rate' => 7.28,	'constant' => 5860 ),
																	array( 'income' => 159350,	'rate' => 7.78,	'constant' => 6635 ),
																	array( 'income' => 212500,	'rate' => 8.08,	'constant' => 10771 ),
																	array( 'income' => 318750,	'rate' => 7.15,	'constant' => 15065 ),
																	array( 'income' => 371900,	'rate' => 8.15,	'constant' => 22662 ),
																	array( 'income' => 1062650,	'rate' => 7.35,	'constant' => 26994 ),
																	array( 'income' => 2125450,	'rate' => 7.65,	'constant' => 77764 ),
																	array( 'income' => 2178650,	'rate' => 9.62,	'constant' => 206107 ),
																	array( 'income' => 2178650,	'rate' => 88.42,	'constant' => 159068 ),
																	),
															),
												20140101 => array(
															10 => array(
																	array( 'income' => 8300,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11450,	'rate' => 4.5,	'constant' => 332 ),
																	array( 'income' => 13550,	'rate' => 5.25,	'constant' => 474 ),
																	array( 'income' => 20850,	'rate' => 5.90,	'constant' => 584 ),
																	array( 'income' => 78400,	'rate' => 6.45,	'constant' => 1015 ),
																	array( 'income' => 94100,	'rate' => 6.65,	'constant' => 4727 ),
																	array( 'income' => 104600,	'rate' => 7.58,	'constant' => 5771 ),
																	array( 'income' => 156900,	'rate' => 8.08,	'constant' => 6567 ),
																	array( 'income' => 209250,	'rate' => 7.15,	'constant' => 10792 ),
																	array( 'income' => 261550,	'rate' => 8.15,	'constant' => 14535 ),
																	array( 'income' => 1046350,	'rate' => 7.35,	'constant' => 18798 ),
																	array( 'income' => 1098700,	'rate' => 9.62,	'constant' => 102143 ),
																	array( 'income' => 1098700,	'rate' => 49.02,	'constant' => 76481 ),
																	),
															20 => array(
																	array( 'income' => 8300,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11450,	'rate' => 4.5,	'constant' => 332 ),
																	array( 'income' => 13550,	'rate' => 5.25,	'constant' => 474 ),
																	array( 'income' => 20850,	'rate' => 5.90,	'constant' => 584 ),
																	array( 'income' => 78400,	'rate' => 6.45,	'constant' => 1015 ),
																	array( 'income' => 94100,	'rate' => 6.65,	'constant' => 4727 ),
																	array( 'income' => 104600,	'rate' => 7.28,	'constant' => 5771 ),
																	array( 'income' => 156900,	'rate' => 7.78,	'constant' => 6535 ),
																	array( 'income' => 209250,	'rate' => 8.08,	'constant' => 10604 ),
																	array( 'income' => 313850,	'rate' => 7.15,	'constant' => 14834 ),
																	array( 'income' => 366200,	'rate' => 8.15,	'constant' => 22313 ),
																	array( 'income' => 1046350,	'rate' => 7.35,	'constant' => 26579 ),
																	array( 'income' => 2092800,	'rate' => 7.65,	'constant' => 76570 ),
																	array( 'income' => 2145150,	'rate' => 9.62,	'constant' => 202912 ),
																	array( 'income' => 2145150,	'rate' => 88.42,	'constant' => 156624 ),
																	),
															),
												20130101 => array(
															10 => array(
																	array( 'income' => 8200,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11300,	'rate' => 4.5,	'constant' => 328 ),
																	array( 'income' => 13350,	'rate' => 5.25,	'constant' => 468 ),
																	array( 'income' => 20550,	'rate' => 5.90,	'constant' => 575 ),
																	array( 'income' => 77150,	'rate' => 6.45,	'constant' => 1000 ),
																	array( 'income' => 92600,	'rate' => 6.65,	'constant' => 4651 ),
																	array( 'income' => 102900,	'rate' => 7.58,	'constant' => 5678 ),
																	array( 'income' => 154350,	'rate' => 8.08,	'constant' => 6459 ),
																	array( 'income' => 205850,	'rate' => 7.15,	'constant' => 10616 ),
																	array( 'income' => 257300,	'rate' => 8.15,	'constant' => 14298 ),
																	array( 'income' => 1029250,	'rate' => 7.35,	'constant' => 18491 ),
																	array( 'income' => 1080750,	'rate' => 9.62,	'constant' => 100475 ),
																	array( 'income' => 1080750,	'rate' => 49.02,	'constant' => 75230 ),
																	),
															20 => array(
																	array( 'income' => 8200,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11300,	'rate' => 4.5,	'constant' => 328 ),
																	array( 'income' => 13350,	'rate' => 5.25,	'constant' => 468 ),
																	array( 'income' => 20550,	'rate' => 5.90,	'constant' => 575 ),
																	array( 'income' => 77150,	'rate' => 6.45,	'constant' => 1000 ),
																	array( 'income' => 92600,	'rate' => 6.65,	'constant' => 4651 ),
																	array( 'income' => 102900,	'rate' => 7.28,	'constant' => 5678 ),
																	array( 'income' => 154350,	'rate' => 7.78,	'constant' => 6428 ),
																	array( 'income' => 205850,	'rate' => 8.08,	'constant' => 10431 ),
																	array( 'income' => 308750,	'rate' => 7.15,	'constant' => 14592 ),
																	array( 'income' => 360250,	'rate' => 8.15,	'constant' => 21949 ),
																	array( 'income' => 1029250,	'rate' => 7.35,	'constant' => 26147 ),
																	array( 'income' => 2058550,	'rate' => 7.65,	'constant' => 75318 ),
																	array( 'income' => 2110050,	'rate' => 9.62,	'constant' => 199596 ),
																	array( 'income' => 2110050,	'rate' => 88.42,	'constant' => 154059 ),
																	),
															),
												20100101 => array(
															10 => array(
																	array( 'income' => 8000,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11000,	'rate' => 4.5,	'constant' => 320 ),
																	array( 'income' => 13000,	'rate' => 5.25,	'constant' => 455 ),
																	array( 'income' => 20000,	'rate' => 5.90,	'constant' => 560 ),
																	array( 'income' => 90000,	'rate' => 6.85,	'constant' => 973 ),
																	array( 'income' => 100000,	'rate' => 7.64,	'constant' => 5768 ),
																	array( 'income' => 150000,	'rate' => 8.14,	'constant' => 6532 ),
																	array( 'income' => 200000,	'rate' => 7.35,	'constant' => 10602 ),
																	array( 'income' => 300000,	'rate' => 8.35,	'constant' => 14277 ),
																	array( 'income' => 350000,	'rate' => 12.35,	'constant' => 22627 ),
																	array( 'income' => 500000,	'rate' => 8.35,	'constant' => 28802 ),
																	array( 'income' => 550000,	'rate' => 9.77,	'constant' => 51662 ),
																	array( 'income' => 550000,	'rate' => 20.67,	'constant' => 41327 ),
																	),
															20 => array(
																	array( 'income' => 8000,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11000,	'rate' => 4.5,	'constant' => 320 ),
																	array( 'income' => 13000,	'rate' => 5.25,	'constant' => 455 ),
																	array( 'income' => 20000,	'rate' => 5.90,	'constant' => 560 ),
																	array( 'income' => 90000,	'rate' => 6.85,	'constant' => 973 ),
																	array( 'income' => 100000,	'rate' => 7.64,	'constant' => 5768 ),
																	array( 'income' => 150000,	'rate' => 8.14,	'constant' => 6532 ),
																	array( 'income' => 300000,	'rate' => 7.35,	'constant' => 10602 ),
																	array( 'income' => 350000,	'rate' => 14.35,	'constant' => 21627 ),
																	array( 'income' => 500000,	'rate' => 8.35,	'constant' => 28802 ),
																	array( 'income' => 550000,	'rate' => 9.77,	'constant' => 51662 ),
																	array( 'income' => 550000,	'rate' => 20.67,	'constant' => 41327 ),
																	),
															),
												20090501 => array(
															10 => array(
																	array( 'income' => 8000,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11000,	'rate' => 4.5,	'constant' => 320 ),
																	array( 'income' => 13000,	'rate' => 5.25,	'constant' => 455 ),
																	array( 'income' => 20000,	'rate' => 5.90,	'constant' => 560 ),
																	array( 'income' => 90000,	'rate' => 6.85,	'constant' => 973 ),
																	array( 'income' => 100000,	'rate' => 7.64,	'constant' => 5768 ),
																	array( 'income' => 150000,	'rate' => 8.14,	'constant' => 6532 ),
																	array( 'income' => 200000,	'rate' => 7.35,	'constant' => 10602 ),
																	array( 'income' => 300000,	'rate' => 8.85,	'constant' => 14277 ),
																	array( 'income' => 350000,	'rate' => 14.85,	'constant' => 23127 ),
																	array( 'income' => 500000,	'rate' => 8.85,	'constant' => 30552 ),
																	array( 'income' => 550000,	'rate' => 11.03,	'constant' => 57492 ),
																	array( 'income' => 550000,	'rate' => 27.33,	'constant' => 43827 ),
																	),
															20 => array(
																	array( 'income' => 8000,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11000,	'rate' => 4.5,	'constant' => 320 ),
																	array( 'income' => 13000,	'rate' => 5.25,	'constant' => 455 ),
																	array( 'income' => 20000,	'rate' => 5.90,	'constant' => 560 ),
																	array( 'income' => 90000,	'rate' => 6.85,	'constant' => 973 ),
																	array( 'income' => 100000,	'rate' => 7.64,	'constant' => 5768 ),
																	array( 'income' => 150000,	'rate' => 8.14,	'constant' => 6532 ),
																	array( 'income' => 300000,	'rate' => 7.35,	'constant' => 10602 ),
																	array( 'income' => 350000,	'rate' => 17.85,	'constant' => 21627 ),
																	array( 'income' => 500000,	'rate' => 8.85,	'constant' => 30552 ),
																	array( 'income' => 550000,	'rate' => 11.03,	'constant' => 57492 ),
																	array( 'income' => 550000,	'rate' => 27.33,	'constant' => 43827 ),
																	),
															),
												20060101 => array(
															10 => array(
																	array( 'income' => 8000,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11000,	'rate' => 4.5,	'constant' => 320 ),
																	array( 'income' => 13000,	'rate' => 5.25,	'constant' => 455 ),
																	array( 'income' => 20000,	'rate' => 5.90,	'constant' => 580 ),
																	array( 'income' => 90000,	'rate' => 6.85,	'constant' => 973 ),
																	array( 'income' => 100000,	'rate' => 7.64,	'constant' => 5768 ),
																	array( 'income' => 150000,	'rate' => 7.35,	'constant' => 10604 ),
																	array( 'income' => 150000,	'rate' => 8.14,	'constant' => 6532 ),
																	),
															20 => array(
																	array( 'income' => 8000,	'rate' => 4.0,	'constant' => 0 ),
																	array( 'income' => 11000,	'rate' => 4.5,	'constant' => 320 ),
																	array( 'income' => 13000,	'rate' => 5.25,	'constant' => 455 ),
																	array( 'income' => 20000,	'rate' => 5.90,	'constant' => 580 ),
																	array( 'income' => 90000,	'rate' => 6.85,	'constant' => 973 ),
																	array( 'income' => 100000,	'rate' => 7.64,	'constant' => 5768 ),
																	array( 'income' => 150000,	'rate' => 7.35,	'constant' => 10604 ),
																	array( 'income' => 150000,	'rate' => 8.14,	'constant' => 6532 ),
																),
															),
												);		

	var $district_options = array(
								20150101 => array( // 01-Jan-2015
													'standard_deduction' => array(
																				'10' => 7350.00,
																				'20' => 7850.00,
																				'30' => 7850.00,
																				'40' => 7350.00,
																				),
													'allowance' => array(
																				'10' => 1000,
																				'20' => 1000,
																				'30' => 1000,
																				'40' => 1000,
																				),
													),
								20140101 => array( // 01-Jan-2014
													'standard_deduction' => array(
																				'10' => 7250.00,
																				'20' => 7750.00,
																				'30' => 7750.00,
																				'40' => 7250.00,
																				),
													'allowance' => array(
																				'10' => 1000,
																				'20' => 1000,
																				'30' => 1000,
																				'40' => 1000,
																				),
													),
								20130101 => array( // 01-Jan-2013
													'standard_deduction' => array(
																				'10' => 7150.00,
																				'20' => 7650.00,
																				'30' => 7650.00,
																				'40' => 7150.00,
																				),
													'allowance' => array(
																				'10' => 1000,
																				'20' => 1000,
																				'30' => 1000,
																				'40' => 1000,
																				),
													),
								20060101 => array(
													'standard_deduction' => array(
																				'10' => 6975.00,
																				'20' => 7475.00,
																				'30' => 6975.00,
																				'40' => 6975.00,
																				),
													'allowance' => array(
																				'10' => 1000,
																				'20' => 1000,
																				'30' => 1000,
																				'40' => 1000,
																				),
													)
								);

	function getDistrictAnnualTaxableIncome() {
		$annual_income = $this->getAnnualTaxableIncome();
		$federal_tax = $this->getFederalTaxPayable();
		$district_deductions = $this->getDistrictStandardDeduction();
		$district_allowance = $this->getDistrictAllowanceAmount();

		$income = bcsub( bcsub( $annual_income, $district_deductions), $district_allowance );

		Debug::text('District Annual Taxable Income: '. $income, __FILE__, __LINE__, __METHOD__, 10);

		return $income;
	}

	function getDistrictStandardDeduction() {
		$retarr = $this->getDataFromRateArray($this->getDate(), $this->district_options);
		if ( $retarr == FALSE ) {
			return FALSE;

		}

		$deduction = $retarr['standard_deduction'][$this->getDistrictFilingStatus()];

		Debug::text('Standard Deduction: '. $deduction, __FILE__, __LINE__, __METHOD__, 10);

		return $deduction;
	}

	function getDistrictAllowanceAmount() {
		$retarr = $this->getDataFromRateArray($this->getDate(), $this->district_options);
		if ( $retarr == FALSE ) {
			return FALSE;

		}

		$allowance = $retarr['allowance'][$this->getDistrictFilingStatus()];

		if ( $this->getDistrictAllowance() == 0 ) {
			$retval = 0;
		} else {
			$retval = bcmul( $this->getDistrictAllowance(), $allowance );
		}

		Debug::text('District Allowance Amount: '. $retval, __FILE__, __LINE__, __METHOD__, 10);


		return $retval;
	}

	function getDistrictTaxPayable() {
		$annual_income = $this->getDistrictAnnualTaxableIncome();

		$retval = 0;

		if ( $annual_income > 0 ) {
			$rate = $this->getData()->getDistrictRate($annual_income);
			$district_constant = $this->getData()->getDistrictConstant($annual_income);
			$district_rate_income = $this->getData()->getDistrictRatePreviousIncome($annual_income);

			$retval = bcadd( bcmul( bcsub( $annual_income, $district_rate_income ), $rate ), $district_constant );
		}

		if ( $retval < 0 ) {
			$retval = 0;
		}

		Debug::text('District Annual Tax Payable: '. $retval, __FILE__, __LINE__, __METHOD__, 10);

		return $retval;
	}
}
?>
