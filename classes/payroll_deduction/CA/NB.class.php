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
 * @package PayrollDeduction\CA
 */
class PayrollDeduction_CA_NB extends PayrollDeduction_CA {
	var $provincial_income_tax_rate_options = array(
													20160101 => array(
																	array( 'income' => 40492,	'rate' => 9.68,	'constant' => 0 ),
																	array( 'income' => 80985,	'rate' => 14.82,'constant' => 2081 ),
																	array( 'income' => 131664,	'rate' => 16.52,'constant' => 3458 ),
																	array( 'income' => 150000,	'rate' => 17.84,'constant' => 5196 ),
																	array( 'income' => 250000,	'rate' => 21.00,'constant' => 9936 ),
																	array( 'income' => 250000,	'rate' => 25.75,'constant' => 21811 ),
																),
													20150701 => array(
																	array( 'income' => 39973,	'rate' => 9.68,	'constant' => 0 ),
																	array( 'income' => 79946,	'rate' => 14.82,'constant' => 2055 ),
																	array( 'income' => 129975,	'rate' => 16.52,'constant' => 3414 ),
																	array( 'income' => 150000,	'rate' => 17.84,'constant' => 5129 ),
																	array( 'income' => 250000,	'rate' => 24.16,'constant' => 14609 ),
																	array( 'income' => 250000,	'rate' => 33.66,'constant' => 38359 ),
																),
													20150101 => array(
																	array( 'income' => 39973,	'rate' => 9.68,	'constant' => 0 ),
																	array( 'income' => 79946,	'rate' => 14.82,'constant' => 2055 ),
																	array( 'income' => 129975,	'rate' => 16.52,'constant' => 3414 ),
																	array( 'income' => 129975,	'rate' => 17.84,'constant' => 5129 ),
																),
													20140101 => array(
																	array( 'income' => 39305,	'rate' => 9.68,	'constant' => 0 ),
																	array( 'income' => 78609,	'rate' => 14.82,'constant' => 2020 ),
																	array( 'income' => 127802,	'rate' => 16.52,'constant' => 3357 ),
																	array( 'income' => 127802,	'rate' => 17.84,'constant' => 5044 ),
																),
													20130701 => array(
																	array( 'income' => 38954,	'rate' => 9.68,	'constant' => 0 ),
																	array( 'income' => 77908,	'rate' => 14.82,'constant' => 2002 ),
																	array( 'income' => 126662,	'rate' => 16.52,'constant' => 3327 ),
																	array( 'income' => 126662,	'rate' => 17.84,'constant' => 4999 ),
																),
													20130101 => array(
																	array( 'income' => 38954,	'rate' => 9.1,	'constant' => 0 ),
																	array( 'income' => 77908,	'rate' => 12.10,'constant' => 1169 ),
																	array( 'income' => 126662,	'rate' => 12.40,'constant' => 1402 ),
																	array( 'income' => 126662,	'rate' => 14.30,'constant' => 3809 ),
																),
													20120101 => array(
																	array( 'income' => 38190,	'rate' => 9.1,	'constant' => 0 ),
																	array( 'income' => 76380,	'rate' => 12.10,'constant' => 1146 ),
																	array( 'income' => 124178,	'rate' => 12.40,'constant' => 1375 ),
																	array( 'income' => 124178,	'rate' => 14.30,'constant' => 3734 ),
																),
													20110701 => array(
																	array( 'income' => 37150,	'rate' => 9.1,	'constant' => 0 ),
																	array( 'income' => 74300,	'rate' => 12.10,'constant' => 1115 ),
																	array( 'income' => 120796,	'rate' => 12.40,'constant' => 1337 ),
																	array( 'income' => 120796,	'rate' => 15.90,'constant' => 1700 ),
																),
													20110101 => array(
																	array( 'income' => 37150,	'rate' => 9.1,	'constant' => 0 ),
																	array( 'income' => 74300,	'rate' => 12.10,'constant' => 1115 ),
																	array( 'income' => 120796,	'rate' => 12.40,'constant' => 1337 ),
																	array( 'income' => 120796,	'rate' => 12.70,'constant' => 1700 ),
																),
													20100101 => array(
																	array( 'income' => 36421,	'rate' => 9.3,	'constant' => 0 ),
																	array( 'income' => 72843,	'rate' => 12.50,'constant' => 1165 ),
																	array( 'income' => 118427,	'rate' => 13.30,'constant' => 1748 ),
																	array( 'income' => 118427,	'rate' => 14.30,'constant' => 2932 ),
																),
													20090701 => array(
																	array( 'income' => 35707,	'rate' => 9.18,	'constant' => 0 ),
																	array( 'income' => 71415,	'rate' => 13.53,'constant' => 1550 ),
																	array( 'income' => 116105,	'rate' => 15.20,'constant' => 2749 ),
																	array( 'income' => 116105,	'rate' => 16.05,'constant' => 3736 ),
																),
													20090101 => array(
																	array( 'income' => 35707,	'rate' => 10.12,'constant' => 0 ),
																	array( 'income' => 71415,	'rate' => 15.48,'constant' => 1914 ),
																	array( 'income' => 116105,	'rate' => 16.8,	'constant' => 2857 ),
																	array( 'income' => 116105,	'rate' => 17.95,'constant' => 4192 ),
																),
													20080101 => array(
																	array( 'income' => 34836,	'rate' => 10.12,'constant' => 0 ),
																	array( 'income' => 69673,	'rate' => 15.48,'constant' => 1867 ),
																	array( 'income' => 113273,	'rate' => 16.80,'constant' => 2787 ),
																	array( 'income' => 113273,	'rate' => 17.95,'constant' => 4090 ),
																),
													20070701 => array(
																	array( 'income' => 34186,	'rate' => 10.56,'constant' => 0 ),
																	array( 'income' => 68374,	'rate' => 16.14,'constant' => 1908 ),
																	array( 'income' => 111161,	'rate' => 17.08,'constant' => 2550 ),
																	array( 'income' => 111161,	'rate' => 18.06,'constant' => 3640 ),
																),
													20070101 => array(
																	array( 'income' => 34186,	'rate' => 9.68,	'constant' => 0 ),
																	array( 'income' => 68374,	'rate' => 14.82,'constant' => 1757 ),
																	array( 'income' => 111161,	'rate' => 16.52,'constant' => 2920 ),
																	array( 'income' => 111161,	'rate' => 17.84,'constant' => 4387 ),
																),
													);
}
?>
